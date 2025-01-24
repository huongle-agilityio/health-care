'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ROUTE_ENDPOINT, BASE_URL, QUERY_KEY, ROUTES } from '@/constants';

// Types
import {
  BookingAppointmentPayload,
  BookingAppointmentPayloadResponse,
  BookingSlot,
  BookingSlotResponse,
  BookingTimeSlots,
  DoctorTimeSlotsResponse,
} from '@/types';
import { safeHttpRequest } from './safeHttpRequest';

/**
 * Gets booking appointments by user id.
 *
 * @param {string} userId - The id of the user to get booking appointments for.
 * @returns {Promise<BookingSlot[]>} A promise that resolves to an array of booking appointments.
 */
export const getBookingAppointmentByUserId = async (userId: string) =>
  safeHttpRequest<BookingSlot[]>((token) => {
    const endpoint = `${API_ROUTE_ENDPOINT.BOOKING_SLOT_USER}${userId}`;
    return httpClient.get<BookingSlotResponse>({
      endpoint,
      token,
      options: {
        next: {
          tags: [`${API_ROUTE_ENDPOINT.BOOKING_SLOT_USER}${userId}`],
        },
        baseUrl: BASE_URL,
      },
    });
  }, true);

/**
 * Gets all booking time slots of a doctor by doctor id and date.
 *
 * @param {string} doctorId - The id of the doctor to get booking time slots for.
 * @param {string} date - The date to get booking time slots for.
 * @returns {Promise<BookingTimeSlots[]>} A promise that resolves to an array of booking time slots.
 */
export const getBookingTimeSlotByDoctorId = async (
  doctorId: string,
  date: string,
) =>
  safeHttpRequest<BookingTimeSlots[]>((token) => {
    const endpoint = `${API_ROUTE_ENDPOINT.BOOKING_SLOT_DOCTOR}${doctorId}?date=${date}`;
    return httpClient.get<DoctorTimeSlotsResponse>({
      endpoint,
      token,
      options: {
        baseUrl: BASE_URL,
      },
    });
  }, true);

/**
 * Creates a new booking appointment.
 *
 * @param {BookingAppointmentPayload} payload - The payload of the booking appointment to create.
 * @returns {Promise<BookingAppointmentPayload>} A promise that resolves to the created booking appointment.
 */
export const createBookingAppointment = async (
  payload: BookingAppointmentPayload,
) => {
  const response = safeHttpRequest<BookingAppointmentPayload>(
    (token) =>
      httpClient.post<
        BookingAppointmentPayloadResponse,
        BookingAppointmentPayload
      >({
        endpoint: API_ROUTE_ENDPOINT.BOOKING_SLOT,
        body: payload,
        token,
        options: {
          baseUrl: BASE_URL,
        },
      }),
    true,
  );
  revalidatePath(ROUTES.SCHEDULES);
  revalidateTag(QUERY_KEY.BOOKING_TIME_SLOT_BY_DOCTOR_ID(payload.data.doctor));

  return response;
};
