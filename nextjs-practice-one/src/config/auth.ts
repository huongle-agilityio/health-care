import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ROUTE_ENDPOINT, BASE_URL } from '@/constants';

// Config
import { authConfig } from './auth.config';

// Types
import { AuthPayload, AuthResponse } from '@/types';

const CredentialsProvider = Credentials({
  /**
   * Authenticates the user and returns the user data and JWT if successful.
   *
   * @param {Partial<AuthPayload>} credentials - The user credentials.
   * @returns {Promise<AuthPayload | null>} The user data and JWT if successful, otherwise null.
   */
  authorize: async (credentials: Partial<AuthPayload>) => {
    const { email = '', password = '' } = credentials;
    const payload = {
      identifier: email,
      email,
      password,
    };

    const response = await httpClient.post<AuthResponse, AuthPayload>({
      endpoint: API_ROUTE_ENDPOINT.SIGN_IN,
      body: payload,
      options: {
        baseUrl: BASE_URL,
      },
    });

    const { user, jwt } = response;

    return user ? { ...user, jwt } : null;
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [CredentialsProvider],
});
