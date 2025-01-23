// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import { SpecialtyResponse } from '@/types';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const GET = async () =>
  handleAPIRouteRequest({
    requestHandler: () =>
      httpClient.get<SpecialtyResponse>({
        endpoint: API_ENDPOINT.SPECIALTY,
      }),
  });
