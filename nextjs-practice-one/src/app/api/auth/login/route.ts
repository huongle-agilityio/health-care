import { NextRequest } from 'next/server';

// Constants
import { API_ENDPOINT } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import { AuthPayload, AuthResponse, User } from '@/types';

// Schema
import { loginSchema } from '@/schema';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const POST = async (request: NextRequest) =>
  handleAPIRouteRequest<AuthResponse, AuthPayload>({
    request,
    schema: loginSchema,
    requestHandler: async (body) => {
      const { user, jwt } = await httpClient.post<AuthResponse, AuthPayload>({
        endpoint: API_ENDPOINT.SIGN_IN,
        body,
      });

      const userResponse = await httpClient.get<User>({
        endpoint: `${API_ENDPOINT.USER}/${user?.id}?populate=role`,
        token: jwt,
      });

      return { user: { ...user, role: userResponse?.role }, jwt };
    },
  });
