// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT, QUERY_FILTER_URL } from '@/constants';

// Types
import { TimeSlotResponse } from '@/types';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const GET = async () =>
  handleAPIRouteRequest({
    requestHandler: () => {
      const endpoint = `${API_ENDPOINT.TIME_SLOT}?${QUERY_FILTER_URL.SORT_BY_TIME}`;
      return httpClient.get<TimeSlotResponse>({
        endpoint,
      });
    },
  });
