import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth/auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth/login', '/auth/error'];

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some(
    route => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + '/')
  );

  // If user is not authenticated and trying to access a protected route
  if (!session && !isPublicRoute && !isAuthRoute && !isApiRoute) {
    // Redirect to login page
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (session && isAuthRoute && request.nextUrl.pathname !== '/auth/error') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all routes except static files, api routes that don't need auth check, and _next
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
