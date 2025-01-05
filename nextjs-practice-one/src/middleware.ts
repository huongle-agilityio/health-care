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
    '/((?!api|favicon.ico|sitemap.xml|robots.txt|_next/static|.*\\.png$|.*\\.webp$|.*\\.svg$).*)',
  ],
};
