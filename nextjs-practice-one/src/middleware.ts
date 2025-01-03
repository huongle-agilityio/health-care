import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Constants
import { ROUTERS, COOKIES_KEYS } from './constants';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIES_KEYS.TOKEN);

  if (
    !token &&
    (request.nextUrl.pathname.endsWith('/booking-appointments') ||
      request.nextUrl.pathname.endsWith(ROUTERS.SETTING))
  ) {
    return NextResponse.redirect(new URL(ROUTERS.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
