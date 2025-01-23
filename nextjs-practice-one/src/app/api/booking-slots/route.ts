import { NextRequest } from 'next/server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// HOCs
import { withAuthenticated } from '@/hocs';

// Types
import {
  BookingAppointmentPayload,
  BookingAppointmentPayloadResponse,
} from '@/types';

// Schema
import { bookingPayloadAPISchema } from '@/schema';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const POST = withAuthenticated(async (request: NextRequest, token) =>
  handleAPIRouteRequest<
    BookingAppointmentPayloadResponse,
    BookingAppointmentPayload
  >({
    request,
    schema: bookingPayloadAPISchema,
    requestHandler: async (body) =>
      httpClient.post<
        BookingAppointmentPayloadResponse,
        BookingAppointmentPayload
      >({
        endpoint: API_ENDPOINT.BOOKING_SLOT,
        body,
        token,
      }),
  }),
);
