'use server';

import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';

// Services
import { httpClient } from '@/services';

// Config
import { signIn, signOut } from '@/config';

// Constants
import {
  API_ROUTE_ENDPOINT,
  AUTH_METHOD,
  BASE_URL,
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
export const signUp = async (
  payload: AuthPayload,
): Promise<string | undefined> => {
  const responseSignUp = await httpClient.post<AuthResponse, AuthPayload>({
    endpoint: API_ROUTE_ENDPOINT.SIGN_UP,
    body: payload,
    options: {
      baseUrl: BASE_URL,
    },
  });

  const loginPayload = {
    email: responseSignUp.user.email,
    password: payload.password,
  };

  return login(loginPayload);
};

/**
 * Logout and redirects to the login page.
 */
export const logout = async () => {
  await signOut({ redirectTo: ROUTES.LOGIN });
};

export const revalidateHomeLayout = async () => revalidatePath('/', 'layout');
