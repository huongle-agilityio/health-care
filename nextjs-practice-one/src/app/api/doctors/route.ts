// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import { ListDoctorResponse } from '@/types';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const GET = async () =>
  handleAPIRouteRequest({
    requestHandler: () =>
      httpClient.get<ListDoctorResponse>({
        endpoint: API_ENDPOINT.DOCTOR,
      }),
  });
