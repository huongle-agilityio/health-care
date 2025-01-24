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
  ListDoctorResponse,
} from '@/types';

// Utils
import { safeHttpRequest } from './safeHttpRequest';

/**
 * Fetches a list of doctors based on the provided filter parameters.
 *
 * @param {string} params.specialty - The specialty of the doctors to filter by.
 * @param {number} params.rating - The rating of the doctors to filter by.
 * @param {string} params.experience - The experience level of the doctors to filter by.
 * @param {number} params.fee - The fee of the doctors to filter by.
 * @param {number} params.page - The page number for pagination.
 * @returns {Promise<Doctor[]>} A promise that resolves to an array of doctors matching the criteria.
 */
export const getDoctorsByParams = async ({
  specialty,
  rating,
  experience,
  fee,
  page,
}: DoctorFilterParams) =>
  safeHttpRequest<Doctor[]>(() => {
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

    return httpClient.get<ListDoctorResponse>(url);
  });

/**
 * Fetches a doctor by ID.
 *
 * @param {string} id - The ID of the doctor to fetch.
 * @returns {Promise<Doctor>} A promise that resolves to the doctor with the matching ID.
 */
export const getDoctorById = async (id: string) =>
  safeHttpRequest<Doctor>(() => {
    const url = `${API_ENDPOINT.DOCTOR}${QUERY_URL.DOCTOR_BY_ID(id)}`;
    return httpClient.get<ApiPaginationResponse<Doctor>>(url);
  });

/**
 * Fetches all doctors.
 *
 * @returns {Promise<Doctor[]>} A promise that resolves to an array of all doctors.
 */
export const getDoctors = async () =>
  safeHttpRequest<Doctor[]>(() =>
    httpClient.get<ListDoctorResponse>(API_ENDPOINT.DOCTOR, '', {
      next: { revalidate: TIMING.REVALIDATE_AFTER_A_DAY },
    }),
  );
