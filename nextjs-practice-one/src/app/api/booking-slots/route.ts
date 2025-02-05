import { NextRequest } from 'next/server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT, CURRENT_PAGE, QUERY_URL } from '@/constants';

// HOCs
import { withAuthenticated } from '@/hocs';

// Types
import {
  BookingAppointmentPayload,
  BookingAppointmentPayloadResponse,
  BookingSlotResponse,
} from '@/types';

// Schema
import { bookingPayloadAPISchema } from '@/schema';

// Utils
import { groupAndFormatBookings } from '@/utils';
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

export const GET = withAuthenticated(async (request: NextRequest, token) =>
  handleAPIRouteRequest({
    requestHandler: async () => {
      const page =
        Number(request.nextUrl.searchParams.get('page')) || CURRENT_PAGE;
      const response = await httpClient.get<BookingSlotResponse>({
        endpoint: `${API_ENDPOINT.BOOKING_SLOT}${QUERY_URL.APPOINTMENT_HISTORY(page)}`,
        token,
      });
      const formattedResponse = groupAndFormatBookings(response.data);

      return {
        ...response,
        data: formattedResponse,
      };
    },
  }),
);
