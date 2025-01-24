// Constants
import { API_ENDPOINT, BASE_URL } from '@/constants';

// Service
import { httpClient } from '@/services';

// Types
import { TimeSlot, TimeSlotResponse } from '@/types';

// Utils
import { safeHttpRequest } from './safeHttpRequest';

/**
 * Gets all available time slots sorted by time.
 *
 * @returns {Promise<TimeSlot[]>} A promise that resolves to an array of time slots.
 */
export const getTimeSlot = async () =>
  safeHttpRequest<TimeSlot[]>(() => {
    return httpClient.get<TimeSlotResponse>({
      endpoint: API_ENDPOINT.TIME_SLOT,
      options: {
        next: {
          tags: [API_ENDPOINT.TIME_SLOT],
        },
        baseUrl: BASE_URL,
      },
    });
  });
