// src/middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UserRole } from './types/enums';

// Define public paths that should always be accessible
const publicPaths = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/confirm',
  '/auth/error',
  '/auth/update-password',
  '/doorperson/login',
  '/doorperson/scanner',
  '/doorperson/search',
  '/doorperson/checkin',
];

// Disable middleware in development unless explicitly enabled
// In production (Netlify), this will always be enabled for security
const DISABLE_MIDDLEWARE =
  process.env.NODE_ENV === 'development' &&
  process.env.ENABLE_AUTH_IN_DEV !== 'true';

// Define protected routes and the roles required to access them
// Expand this configuration based on your application's needs.
const protectedRoutesConfig: Record<string, UserRole[]> = {
  // Example: Only managers can access /admin and its sub-paths
  '/admin': [UserRole.MANAGER],
  // Dashboard is accessible to all authenticated users
  // '/dashboard': [UserRole.MANAGER], // Commented out to allow all roles
  // Add other role-specific routes here, e.g.:
  // '/dj-tools': [UserRole.DJ, UserRole.MANAGER], // DJs and Managers can access
};

export async function middleware(request: NextRequest) {
  // Skip auth in development mode for faster UX testing (unless explicitly enabled)
  if (DISABLE_MIDDLEWARE) {
    console.log(
      `[DEV MODE] Auth disabled - allowing access to: ${request.nextUrl.pathname}`,
      `(Set ENABLE_AUTH_IN_DEV=true to test auth locally)`
    );
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // Allow access to public paths without further checks if they are explicitly listed
  if (publicPaths.includes(pathname)) {
    // If user is logged in and trying to access root, redirect to dashboard
    if (pathname === '/' && user) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return response; // Allow access to public paths
  }

  // If no user and trying to access a non-public path, redirect to login
  if (!user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/login';
    redirectUrl.searchParams.set(`redirectedFrom`, pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // User is authenticated. If they are on the root path, redirect to dashboard.
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Only check profiles for routes that actually need role-based protection
  let userRole = UserRole.GUEST;

  // Check if this path actually needs role-based protection
  const needsRoleCheck = Object.keys(protectedRoutesConfig).some(routePrefix =>
    pathname.startsWith(routePrefix)
  );

  if (needsRoleCheck) {
    // Only do the database lookup if we actually need to check roles
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      console.log('Profile lookup result:', {
        userId: user.id,
        profile,
        error: profileError?.message,
        hasProfile: !!profile,
      });

      if (profile && !profileError) {
        userRole = profile.role as UserRole;
        console.log('User role set to:', userRole);
      } else {
        console.warn('Profile lookup failed:', profileError?.message);
        userRole = UserRole.GUEST;
      }
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      userRole = UserRole.GUEST;
    }
  }

  // Check if the current path matches any configured protected route prefix
  for (const routePrefix in protectedRoutesConfig) {
    if (pathname.startsWith(routePrefix)) {
      const requiredRoles = protectedRoutesConfig[routePrefix];
      if (!requiredRoles.includes(userRole)) {
        // User does not have the required role for this specific route
        // Redirect to a general dashboard or an unauthorized page
        // Adding a query param can help the target page display a message
        return NextResponse.redirect(new URL('/dashboard?error=unauthorized_access', request.url));
      }
      // User has the required role for this specific route, allow access
      return response;
    }
  }

  // If the path is not public, not specifically role-restricted (or user has access),
  // and the user is logged in, allow access. This covers general authenticated areas like /dashboard.
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes)
     * - auth/ (authentication routes, handled by publicPaths or user status)
     *   (Note: /auth/ routes are implicitly handled by the publicPaths logic and user status checks.
     *    If a user is logged in and tries /auth/login, they should be redirected to dashboard.
     *    If not logged in, /auth/login should be accessible. This logic is above.)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
};
