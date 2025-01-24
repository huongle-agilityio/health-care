'use server';

// Constants
import { API_ROUTE_ENDPOINT, BASE_URL } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import { ApiPaginationResponse, Doctor, ListDoctorResponse } from '@/types';

// Utils
import { safeHttpRequest } from './safeHttpRequest';

/**
 * Fetches all doctors by the given query string.
 *
 * @param {string} queryString - The query string to filter doctors by.
 * @returns {Promise<Doctor[]>} A promise that resolves to an array of doctors.
 */
export const getDoctorsByParams = async (queryString: string) =>
  safeHttpRequest<Doctor[]>(() => {
    const endpoint = `${API_ROUTE_ENDPOINT.DOCTOR_PARAMS}?${queryString}`;

    return httpClient.get<ListDoctorResponse>({
      endpoint,
      options: {
        next: {
          tags: [API_ROUTE_ENDPOINT.DOCTOR_PARAMS],
        },
        baseUrl: BASE_URL,
      },
    });
  });

/**
 * Fetches a doctor by ID.
 *
 * @param {string} id - The ID of the doctor to fetch.
 * @returns {Promise<Doctor>} A promise that resolves to the doctor with the matching ID.
 */
export const getDoctorById = async (id: string) =>
  safeHttpRequest<Doctor>(() => {
    const endpoint = `${API_ROUTE_ENDPOINT.DOCTOR}/${id}`;
    return httpClient.get<ApiPaginationResponse<Doctor>>({
      endpoint,
      options: {
        next: {
          tags: [`${API_ROUTE_ENDPOINT.DOCTOR}/${id}`],
        },
        baseUrl: BASE_URL,
      },
    });
  });

/**
 * Fetches all doctors.
 *
 * @returns {Promise<Doctor[]>} A promise that resolves to an array of all doctors.
 */
export const getDoctors = async () =>
  safeHttpRequest<Doctor[]>(() =>
    httpClient.get<ListDoctorResponse>({
      endpoint: API_ROUTE_ENDPOINT.DOCTOR,
      options: {
        next: {
          tags: [API_ROUTE_ENDPOINT.DOCTOR],
        },
        baseUrl: BASE_URL,
      },
    }),
  );
