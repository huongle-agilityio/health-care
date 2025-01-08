'use server';

// Constants
import { API_ENDPOINT, QUERY_URL } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import {
  ApiPaginationResponse,
  Doctor,
  DoctorFilterParams,
  DoctorResponse,
} from '@/types';

// Utils
import { getExperienceRange } from '@/utils';
import { safeHttpRequest } from './safeHttpRequest';

export const getDoctorsByParams = async ({
  specialty,
  rating,
  experience = '',
  fee,
  page,
}: DoctorFilterParams) =>
  safeHttpRequest<Doctor[]>(async () => {
    const { expEnd, expStart } = getExperienceRange(experience);
    const url = `${API_ENDPOINT.DOCTOR}${QUERY_URL.DOCTORS({
      specialty,
      rating,
      expEnd,
      expStart,
      fee,
      page,
    })}`;
    const response = await httpClient.get<DoctorResponse>(url);

    return response;
  });

export const getDoctorById = async (id: string) =>
  safeHttpRequest<Doctor>(async () => {
    const url = `${API_ENDPOINT.DOCTOR}${QUERY_URL.DOCTOR_BY_ID(id)}`;
    return await httpClient.get<ApiPaginationResponse<Doctor>>(url);
  });

export const getDoctors = async () =>
  safeHttpRequest<Doctor[]>(
    async () => await httpClient.get<DoctorResponse>(API_ENDPOINT.DOCTOR),
  );
