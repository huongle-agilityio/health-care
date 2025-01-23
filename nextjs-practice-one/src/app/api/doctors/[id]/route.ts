import { NextRequest } from 'next/server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT, QUERY_URL } from '@/constants';

// Types
import { ApiPaginationResponse, Doctor } from '@/types';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) =>
  handleAPIRouteRequest({
    requestHandler: async () => {
      const id = (await params).id;
      const endpoint = `${API_ENDPOINT.DOCTOR}${QUERY_URL.DOCTOR_BY_ID(id)}`;

      return await httpClient.get<ApiPaginationResponse<Doctor>>({
        endpoint,
      });
    },
  });
