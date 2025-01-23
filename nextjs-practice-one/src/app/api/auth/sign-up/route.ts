import { NextRequest } from 'next/server';

// Constants
import { API_ENDPOINT } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import { AuthPayload, AuthResponse } from '@/types';

// Schema
import { signUpSchema } from '@/schema';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const POST = async (request: NextRequest) =>
  handleAPIRouteRequest<AuthResponse, AuthPayload>({
    request,
    schema: signUpSchema,
    requestHandler: async (body) =>
      httpClient.post<AuthResponse, AuthPayload>({
        endpoint: API_ENDPOINT.SIGN_IN,
        body,
      }),
  });
