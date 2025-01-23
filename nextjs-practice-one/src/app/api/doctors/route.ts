// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import { DoctorResponse } from '@/types';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const GET = async () =>
  handleAPIRouteRequest({
    requestHandler: () =>
      httpClient.get<DoctorResponse>({
        endpoint: API_ENDPOINT.DOCTOR,
      }),
  });
