import NextAuth from 'next-auth';

// Config
import { authConfig } from '@/config';

export default NextAuth(authConfig).auth;

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request, secret: AUTH_SECRET });

//   if (token && AUTH_ROUTERS.includes(request.nextUrl.pathname)) {
//     return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
//   }

//   if (
//     !token &&
//     PRIVATE_ROUTERS.some((route) => request.nextUrl.pathname.includes(route))
//   ) {
//     return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
//   }

//   return NextResponse.next();
// }

export const config = {
  matcher: [
    '/((?!api|favicon.ico|sitemap.xml|robots.txt|_next/static|.*\\.png$|.*\\.webp$|.*\\.svg$).*)',
  ],
};
