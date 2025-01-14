import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// Config
import { authConfig } from './auth.config';

// Types
import { AuthPayload, AuthResponse } from '@/types';

const CredentialsProvider = Credentials({
  authorize: async (credentials: Partial<AuthPayload>) => {
    const { email = '', password = '' } = credentials;
    const payload = {
      identifier: email,
      email,
      password,
    };

    const response = await httpClient.post<AuthResponse, AuthPayload>(
      API_ENDPOINT.SIGN_IN,
      payload,
    );

    const { user, jwt } = response;

    return user ? { ...user, jwt } : null;
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [CredentialsProvider],
});
