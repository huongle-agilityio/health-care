import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// Constants
import {
  AUTH_ROUTERS,
  AUTH_SECRET,
  PRIVATE_ROUTERS,
  ROUTERS,
} from './constants';

// Config
import { authConfig } from '@/config';

export default NextAuth(authConfig).auth;

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: AUTH_SECRET });

  if (token && AUTH_ROUTERS.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(ROUTERS.HOME, request.url));
  }

  if (
    !token &&
    PRIVATE_ROUTERS.some((route) => request.nextUrl.pathname.includes(route))
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
