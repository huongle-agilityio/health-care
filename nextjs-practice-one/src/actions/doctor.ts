'use server';

// Constants
import { API_ENDPOINT, QUERY_URL } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import { DoctorFilterParams, DoctorResponse } from '@/types';

// Utils
import { getErrorMessage, getExperienceRange } from '@/utils';

export const getDoctors = async ({
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
