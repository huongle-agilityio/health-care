import { NextRequest } from 'next/server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// HOCs
import { withAuthenticated } from '@/hocs';

// Schema
import { userSchema } from '@/schema';

// Types
import { UserPayload, UsersResponse } from '@/types';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const PUT = withAuthenticated(
  async (
    request: NextRequest,
    token,
    { params }: { params?: Promise<{ id: string }> },
  ) =>
    handleAPIRouteRequest<UsersResponse, UserPayload>({
      request,
      schema: userSchema,
      requestHandler: async (payload: UserPayload) => {
        const id = (await params)?.id;
        const endpoint = `${API_ENDPOINT.USER}/${id}`;

        return httpClient.put<UsersResponse, UserPayload>({
          endpoint,
          body: payload,
          token,
        });
      },
    }),
);
