import type { NextAuthConfig } from 'next-auth';

// Constants
import {
  AUTH_ROUTERS,
  PRIVATE_ROUTERS,
  ROUTES,
  TIMING,
  USER_ROLE,
} from '../constants';

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
    /**
     * Determines the authorization state of a user based on their authentication
     *
     * @param {Object} params - The parameters containing auth and request information.
     * @param {Object} params.auth - The authentication object containing user details.
     * @param {Object} params.request - The request object with the nextUrl.
     * @param {URL} params.request.nextUrl - The URL object representing the requested route.
     * @returns {boolean|Response} Returns true if the user is authorized to access the route,
     *                             otherwise returns a Response object to redirect the user.
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role?.name === USER_ROLE.ADMIN;

      // If the user is logged in and trying to access a login/ register route, redirect to the home page.
      if (isLoggedIn && AUTH_ROUTERS.includes(nextUrl.pathname)) {
        return Response.redirect(new URL(ROUTES.HOME, nextUrl));
      }

      // If the user is not admin and trying to access a booking history route, redirect to the home page.
      if (!isAdmin && nextUrl.pathname.includes(ROUTES.BOOKING_HISTORY)) {
        return Response.redirect(new URL(ROUTES.HOME, nextUrl));
      }

      // If the user is not logged in and trying to access a private route, redirect to the login page.
      if (
        !isLoggedIn &&
        PRIVATE_ROUTERS.some((route) => nextUrl.pathname.includes(route))
      ) {
        if (nextUrl.pathname.includes(ROUTES.BOOKING_APPOINTMENTS)) {
          return Response.redirect(
            new URL(ROUTES.LOGIN + `?backTo=${ROUTES.APPOINTMENTS}`, nextUrl),
          );
        }

        return Response.redirect(new URL(ROUTES.LOGIN, nextUrl));
      }

      return true;
    },
    /**
     * The `jwt` callback is called after a user is successfully logged in.
     *
     * @param {UserSession} params.user - The user's session.
     * @param {SessionToken} params.token - The user's JSON Web Token.
     * @returns {Promise<SessionToken>} The updated JSON Web Token.
     */
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === 'update' && session?.user) {
        return { ...token, ...session.user };
      }

      if (user) {
        return Object.assign(token, user);
      }

      return token;
    },

    /**
     * The `session` callback is called to modify the session object
     * before it is returned to the client. It is used to merge the
     * token data into the session's user object.
     *
     * @param {UserSession} params.session - The current session object.
     * @param {SessionToken} params.token - The user's JSON Web Token.
     * @returns {UserSession} The updated session object.
     */
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
