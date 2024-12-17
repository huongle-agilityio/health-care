// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT } from '@/constants';

// Types
import { SpecialtyResponse } from '@/types';

export const getSpecialties = async () => {
  const data = await httpClient.get<SpecialtyResponse>(API_ENDPOINT.SPECIALTY);

  return data;
};
