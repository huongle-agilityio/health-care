import { NextRequest } from 'next/server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT, QUERY_URL } from '@/constants';
import { WORK_EXPERIENCE_YEARS } from '@/constants/mocks';

// Types
import { DoctorFilterParams, ListDoctorResponse } from '@/types';

// Utils
import { handleAPIRouteRequest } from '@/utils/auth';

export const GET = async (request: NextRequest) =>
  handleAPIRouteRequest({
    requestHandler: () => {
      const searchParams = request.nextUrl.searchParams;
      const params: DoctorFilterParams = Object.fromEntries(
        searchParams.entries(),
      );
      const { specialty, rating, experience, fee, page } = params;

      const [minExperience, maxExperience] = experience
        ? WORK_EXPERIENCE_YEARS[experience]
        : [0, 0];
      const endpoint = `${API_ENDPOINT.DOCTOR}${QUERY_URL.DOCTORS({
        specialty,
        rating,
        maxExperience,
        minExperience,
        fee,
        page,
      })}`;

      return httpClient.get<ListDoctorResponse>({
        endpoint,
      });
    },
  });
