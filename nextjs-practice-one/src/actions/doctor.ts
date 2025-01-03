'use server';

// Constants
import { API_ENDPOINT, QUERY_URL } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import { Doctor, DoctorFilterParams, DoctorResponse } from '@/types';

// Utils
import { getErrorMessage, getExperienceRange } from '@/utils';

export const getDoctorsByParams = async ({
  specialty,
  rating,
  experience = '',
  fee,
  page,
}: DoctorFilterParams) => {
  try {
    const { expEnd, expStart } = getExperienceRange(experience);

    const data = await httpClient.get<DoctorResponse>(
      `${API_ENDPOINT.DOCTOR}${QUERY_URL.DOCTORS({
        specialty,
        rating,
        expEnd,
        expStart,
        fee,
        page,
      })}`,
    );

    return {
      data: data.data,
      meta: data.meta,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      meta: { pagination: { page: 0, pageCount: 0, total: 0 } },
      error: getErrorMessage(error),
    };
  }
};

export const getDoctorById = async (id: string) => {
  try {
    const data = await httpClient.get<{ data: Doctor }>(
      `${API_ENDPOINT.DOCTOR}${QUERY_URL.DOCTOR_BY_ID(id)}`,
    );

    return {
      data: data.data,
      error: null,
    };
  } catch (error) {
    return {
      data: {} as Doctor,
      error: getErrorMessage(error),
    };
  }
};

export const getDoctors = async () => {
  try {
    const data = await httpClient.get<DoctorResponse>(API_ENDPOINT.DOCTOR);

    return {
      data: data.data,
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      error: getErrorMessage(error),
    };
  }
};
