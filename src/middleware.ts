import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no session, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // Otherwise allow request through
  return NextResponse.next();
}

// Protect only the paths that need auth
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    // Exclude auth routes from middleware protection
    '/((?!api/auth).*)',
  ],
};
