'use server';

// Constants
import { API_ENDPOINT, QUERY_URL } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import { DoctorResponse } from '@/types';

// Utils
import { getErrorMessage } from '@/utils';

export const getDoctors = async (page?: number) => {
  try {
    const data = await httpClient.get<DoctorResponse>(
      `${API_ENDPOINT.DOCTOR}${QUERY_URL.DOCTORS_AVAILABLE_FROM_TODAY(new Date().toISOString(), page)}`,
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
