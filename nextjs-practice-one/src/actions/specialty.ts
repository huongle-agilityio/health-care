'use server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ROUTE_ENDPOINT, BASE_URL } from '@/constants';

// Types
import { Specialty, SpecialtyResponse } from '@/types';
import { safeHttpRequest } from './safeHttpRequest';

/**
 * Fetches all specialties.
 *
 * @returns {Promise<Specialty[]>} A promise that resolves to an array of all specialties.
 */
export const getSpecialties = async () =>
  safeHttpRequest<Specialty[]>(() =>
    httpClient.get<SpecialtyResponse>({
      endpoint: API_ROUTE_ENDPOINT.SPECIALTY,
      options: {
        next: {
          tags: [API_ROUTE_ENDPOINT.SPECIALTY],
        },
        baseUrl: BASE_URL,
      },
    }),
  );
