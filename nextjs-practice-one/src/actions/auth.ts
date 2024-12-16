'use server';

// Constants
import { API_ENDPOINT } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import { UserPayload, UserResponse } from '@/types';

export const signIn = async (payload: UserPayload) => {
  const data = await httpClient.post<UserResponse, UserPayload>(
    API_ENDPOINT.SIGN_IN,
    payload,
  );

  return data;
};

export const signUp = async (payload: UserPayload) => {
  const data = await httpClient.post<UserResponse, UserPayload>(
    API_ENDPOINT.SIGN_UP,
    payload,
  );

  return data;
};
