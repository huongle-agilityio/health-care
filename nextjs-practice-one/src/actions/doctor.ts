'use server';

// Constants
import { WORK_EXPERIENCE_YEARS } from '@/constants/mocks';
import { API_ENDPOINT, QUERY_URL, TIMING } from '@/constants';

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
import { safeHttpRequest } from './safeHttpRequest';

export const getDoctorsByParams = async ({
  specialty,
  rating,
  experience,
  fee,
  page,
}: DoctorFilterParams) =>
  safeHttpRequest<Doctor[]>(async () => {
    const [minExperience, maxExperience] = experience
      ? WORK_EXPERIENCE_YEARS[experience]
      : [0, 0];
    const url = `${API_ENDPOINT.DOCTOR}${QUERY_URL.DOCTORS({
      specialty,
      rating,
      maxExperience,
      minExperience,
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
    async () =>
      await httpClient.get<DoctorResponse>(API_ENDPOINT.DOCTOR, '', {
        next: { revalidate: TIMING.REVALIDATE_AFTER_A_DAY },
      }),
  );
