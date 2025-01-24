import { NextRequest } from 'next/server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import { DoctorPayload, DoctorResponse, ListDoctorResponse } from '@/types';

// HOCs
import { withAuthenticated } from '@/hocs';

// Schema
import { doctorPayloadAPISchema } from '@/schema';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const GET = async () =>
  handleAPIRouteRequest({
    requestHandler: () =>
      httpClient.get<ListDoctorResponse>({
        endpoint: API_ENDPOINT.DOCTOR,
      }),
  });

export const POST = withAuthenticated(async (request: NextRequest, token) =>
  handleAPIRouteRequest<DoctorResponse, DoctorPayload>({
    request,
    schema: doctorPayloadAPISchema,
    requestHandler: async (payload: DoctorPayload) => {
      return await httpClient.post<DoctorResponse, DoctorPayload>({
        endpoint: API_ENDPOINT.DOCTOR,
        body: payload,
        token,
      });
    },
  }),
);
