import { NextRequest } from 'next/server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT, QUERY_URL } from '@/constants';

// Types
import {
  ApiPaginationResponse,
  Doctor,
  DoctorPayload,
  DoctorResponse,
  PayloadData,
} from '@/types';

// HOCs
import { withAuthenticated } from '@/hocs';

// Schema
import { doctorPayloadAPISchema } from '@/schema';

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

      const response = await httpClient.get<ApiPaginationResponse<Doctor>>({
        endpoint,
      });

      return {
        ...response,
        data: {
          ...response.data,
          fee: response.data.fee.toString(),
          experience: response.data.experience.toString(),
          rating: response.data.rating.toString(),
        },
      };
    },
  });

export const PUT = withAuthenticated(
  async (
    request: NextRequest,
    token,
    { params }: { params?: Promise<{ id: string }> },
  ) =>
    handleAPIRouteRequest<DoctorResponse, DoctorPayload>({
      request,
      schema: doctorPayloadAPISchema,
      requestHandler: async (payload: DoctorPayload) => {
        const payloadDoctor = {
          data: payload,
        };

        const id = (await params)?.id;
        const endpoint = `${API_ENDPOINT.DOCTOR}/${id}`;

        return httpClient.put<DoctorResponse, PayloadData<DoctorPayload>>({
          endpoint,
          body: payloadDoctor,
          token,
        });
      },
    }),
);

export const DELETE = withAuthenticated(
  async (
    _: NextRequest,
    token,
    { params }: { params?: Promise<{ id: string }> },
  ) =>
    handleAPIRouteRequest({
      requestHandler: async () => {
        const id = (await params)?.id;
        const endpoint = `${API_ENDPOINT.DOCTOR}/${id}`;

        return httpClient.delete({
          endpoint,
          token,
        });
      },
    }),
);
