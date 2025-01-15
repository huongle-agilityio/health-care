'use server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

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
    httpClient.get<SpecialtyResponse>(API_ENDPOINT.SPECIALTY, '', {
      cache: 'force-cache',
    }),
  );
