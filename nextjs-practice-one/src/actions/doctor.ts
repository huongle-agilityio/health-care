'use server';

// Constants
import { API_ENDPOINT, QUERY_URL } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import { DoctorResponse } from '@/types';

export const getDoctors = async (page?: number) => {
  const data = await httpClient.get<DoctorResponse>(
    `${API_ENDPOINT.DOCTOR}${QUERY_URL.DOCTORS_AVAILABLE_FROM_TODAY(new Date().toISOString(), page)}`,
  );

  return data;
};
