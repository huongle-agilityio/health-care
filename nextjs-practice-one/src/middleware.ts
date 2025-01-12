import NextAuth from 'next-auth';

// Config
import { authConfig } from '@/config';

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    '/((?!api|favicon.ico|sitemap.xml|robots.txt|_next/static|.*\\.png$|.*\\.webp$|.*\\.svg$).*)',
  ],
};
