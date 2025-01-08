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
  ROUTERS,
} from '@/constants';

// Types
import { UserPayload, UserResponse } from '@/types';

export const login = async (payload: UserPayload) => {
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

export const signUp = async (payload: UserPayload) =>
  await httpClient.post<UserResponse, UserPayload>(
    API_ENDPOINT.SIGN_UP,
    payload,
  );

export const logout = async () => {
  await signOut({ redirectTo: ROUTERS.LOGIN });
};
