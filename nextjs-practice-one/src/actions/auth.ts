'use server';

import { AuthError } from 'next-auth';

// Services
import { httpClient } from '@/services';

// Config
import { signIn, signOut } from '@/config';

// Constants
import {
  API_ENDPOINT,
  AUTH_METHOD,
  ERROR_MESSAGES,
  ERROR_TYPES,
  ROUTES,
} from '@/constants';

// Types
import { AuthPayload, AuthResponse } from '@/types';

/**
 * Login the user in with the provided payload
 *
 * @param {AuthPayload} payload - The payload to sign in with.
 * @returns {Promise<string>} A success message if the user was signed in successfully, or an error message
 */
export const login = async (
  payload: AuthPayload,
): Promise<string | undefined> => {
  try {
    await signIn(AUTH_METHOD.CREDENTIALS, {
      ...payload,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case ERROR_TYPES.CREDENTIALS_SIGN_IN:
        case ERROR_TYPES.CALLBACK_ROUTE_ERROR:
          return ERROR_MESSAGES.EMAIL_PASSWORD_INVALID;

        default:
          return ERROR_MESSAGES.DEFAULT_API_ERROR;
      }
    }
  }
};

/**
 * SignUp the user up with the provided payload
 *
 * @param {AuthPayload} payload - The payload to sign up with.
 * @returns {Promise<AuthResponse>} The response from the API after signing up successfully.
 */
export const signUp = async (payload: AuthPayload): Promise<AuthResponse> =>
  httpClient.post<AuthResponse, AuthPayload>(API_ENDPOINT.SIGN_UP, payload);

/**
 * Logout and redirects to the login page.
 */
export const logout = async () => {
  await signOut({ redirectTo: ROUTES.LOGIN });
};
