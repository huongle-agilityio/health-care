import { NextRequest } from 'next/server';

// Constants
import { API_ENDPOINT, QUERY_URL } from '@/constants';

// Services
import { httpClient } from '@/services';

// HOCs
import { withAuthenticated } from '@/hocs';

// Types
import { DoctorTimeSlotsResponse } from '@/types';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const GET = withAuthenticated(
  async (
    request: NextRequest,
    token,
    { params }: { params?: Promise<{ doctorId: string }> },
  ) =>
    handleAPIRouteRequest({
      requestHandler: async () => {
        const searchParams = request.nextUrl.searchParams;
        const date = searchParams.get('date') || '';
        const doctorId = (await params)?.doctorId || '';
        const endpoint = `${API_ENDPOINT.BOOKING_SLOT}${QUERY_URL.BOOKING_TIME_SLOT(doctorId, date)}`;

        return httpClient.get<DoctorTimeSlotsResponse>({
          endpoint,
          token,
        });
      },
    }),
);
