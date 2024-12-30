'use server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import { SpecialtyResponse } from '@/types';

// Utils
import { getErrorMessage } from '@/utils';

export const getSpecialties = async () => {
  try {
    const data = await httpClient.get<SpecialtyResponse>(
      API_ENDPOINT.SPECIALTY,
    );

    return {
      data: data.data,
      meta: data.meta,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      meta: { pagination: { page: 0, pageCount: 0 } },
      error: getErrorMessage(error),
    };
  }
};
