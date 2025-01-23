import { NextRequest } from 'next/server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT, QUERY_URL } from '@/constants';

// HOCs
import { withAuthenticated } from '@/hocs';

// Types
import { BookingSlotResponse } from '@/types';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const GET = withAuthenticated(
  async (
    _: NextRequest,
    token,
    { params }: { params?: Promise<{ userId: string }> },
  ) =>
    handleAPIRouteRequest({
      requestHandler: async () => {
        const userId = (await params)?.userId || '';
        const endpoint = `${API_ENDPOINT.BOOKING_SLOT}${QUERY_URL.APPOINTMENT_BY_USER_ID(userId)}`;

        return httpClient.get<BookingSlotResponse>({
          endpoint,
          token,
        });
      },
    }),
);
