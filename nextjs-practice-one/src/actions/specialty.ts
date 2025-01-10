'use server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import { Specialty, SpecialtyResponse } from '@/types';
import { safeHttpRequest } from './safeHttpRequest';

export const getSpecialties = async () =>
  safeHttpRequest<Specialty[]>(
    async () =>
      await httpClient.get<SpecialtyResponse>(API_ENDPOINT.SPECIALTY, '', {
        cache: 'force-cache',
      }),
  );
