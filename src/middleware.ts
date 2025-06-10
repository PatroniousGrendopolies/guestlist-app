import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware is temporarily simplified to prevent a redirect loop
// caused by the recent auth system refactor. Client-side components
// are now responsible for handling authentication checks and redirection.
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

// The matcher is configured to run only on dashboard pages.
// Although the middleware currently does nothing, this prevents it
// from running unnecessarily on every request.
export const config = {
  matcher: ['/dashboard/:path*'],
};
