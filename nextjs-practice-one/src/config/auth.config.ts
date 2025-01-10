import type { NextAuthConfig } from 'next-auth';

// Constants
import { ROUTES, TIMING } from '../constants';

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
