import { httpClient } from './http-client';

// Types
import { UserPayload, UserResponse } from '@/types';

// Constants
import { API_ENDPOINT } from '@/constants';

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
