'use server';

import { revalidateTag } from 'next/cache';
import { createImage } from './image';

// Constants
import { API_ROUTE_ENDPOINT, BASE_URL, ERROR_MESSAGES } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import {
  Doctor,
  DoctorPayload,
  DoctorResponse,
  ListDoctorResponse,
} from '@/types';

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
    return httpClient.get<DoctorResponse>({
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

/**
 * Creates a new doctor.
 *
 * @param {DoctorPayload} payload - The payload to create the doctor with.
 * @returns {Promise<Doctor>} A promise that resolves to the created doctor.
 */
export const createDoctor = async (payload: DoctorPayload) => {
  const response = safeHttpRequest<Doctor>(async (token) => {
    if (!(payload.data.avatar instanceof File)) {
      throw new Error(ERROR_MESSAGES.INVALID_IMAGE);
    }

    const responseImage = await createImage(payload.data.avatar);

    const payloadDoctor: DoctorPayload = {
      data: {
        ...payload.data,
        avatar: responseImage.data.url,
      },
    };

    return httpClient.post<DoctorResponse, DoctorPayload>({
      endpoint: API_ROUTE_ENDPOINT.DOCTOR,
      body: payloadDoctor,
      token,
      options: {
        baseUrl: BASE_URL,
      },
    });
  }, true);

  revalidateTag(API_ROUTE_ENDPOINT.DOCTOR_PARAMS);

  return response;
};
