import type { NextAuthConfig } from 'next-auth';

// Constants
import { AUTH_ROUTERS, PRIVATE_ROUTERS, ROUTES, TIMING } from '../constants';

// Types
import { UserSession } from '../types';

declare module 'next-auth' {
  interface Session {
    user: UserSession;
  }
}

export const authConfig = {
  pages: {
    signIn: ROUTES.LOGIN,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn && AUTH_ROUTERS.includes(nextUrl.pathname)) {
        return Response.redirect(new URL(ROUTES.HOME, nextUrl));
      }

      if (
        !isLoggedIn &&
        PRIVATE_ROUTERS.some((route) => nextUrl.pathname.includes(route))
      ) {
        return Response.redirect(new URL(ROUTES.LOGIN, nextUrl));
      }

      return true;
    },
    jwt: async ({ user, token }) => {
      if (token) Object.assign(token, user);

      return token;
    },

    session: ({ session, token }) => {
      Object.assign(session.user, token);

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: TIMING.COOKIES_TIMEOUT,
  },
  trustHost: true,
  providers: [],
} satisfies NextAuthConfig;
