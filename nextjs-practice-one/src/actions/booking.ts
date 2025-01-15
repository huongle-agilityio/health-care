'use server';

// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT, QUERY_FILTER_URL, QUERY_URL } from '@/constants';

// Types
import {
  BookingAppointmentPayload,
  BookingAppointmentPayloadResponse,
  BookingSlot,
  BookingSlotResponse,
  BookingTimeSlots,
  DoctorTimeSlotsResponse,
  TimeSlot,
  TimeSlotResponse,
} from '@/types';
import { safeHttpRequest } from './safeHttpRequest';

/**
 * Gets all available time slots sorted by time.
 *
 * @returns {Promise<TimeSlot[]>} A promise that resolves to an array of time slots.
 */
export const getTimeSlot = async () =>
  safeHttpRequest<TimeSlot[]>(() => {
    const url = `${API_ENDPOINT.TIME_SLOT}?${QUERY_FILTER_URL.SORT_BY_TIME}`;
    return httpClient.get<TimeSlotResponse>(url, '', {
      cache: 'force-cache',
    });
  });

/**
 * Gets booking appointments by user id.
 *
 * @param {string} userId - The id of the user to get booking appointments for.
 * @returns {Promise<BookingSlot[]>} A promise that resolves to an array of booking appointments.
 */
export const getBookingAppointmentByUserId = async (userId: string) =>
  safeHttpRequest<BookingSlot[]>((token) => {
    const url = `${API_ENDPOINT.BOOKING_SLOT}${QUERY_URL.APPOINTMENT_BY_USER_ID(userId)}`;
    return httpClient.get<BookingSlotResponse>(url, token);
  }, true);

/**
 * Gets all booking time slots of a doctor by doctor id and date.
 *
 * @param {string} doctorId - The id of the doctor to get booking time slots for.
 * @param {string} date - The date to get booking time slots for.
 * @returns {Promise<BookingTimeSlots[]>} A promise that resolves to an array of booking time slots.
 */
export const getBookingTimeSlotById = async (doctorId: string, date: string) =>
  safeHttpRequest<BookingTimeSlots[]>((token) => {
    const url = `${API_ENDPOINT.BOOKING_SLOT}${QUERY_URL.BOOKING_TIME_SLOT(doctorId, date)}`;
    return httpClient.get<DoctorTimeSlotsResponse>(url, token);
  }, true);

/**
 * Creates a new booking appointment.
 *
 * @param {BookingAppointmentPayload} payload - The payload of the booking appointment to create.
 * @returns {Promise<BookingAppointmentPayload>} A promise that resolves to the created booking appointment.
 */
export const createBookingAppointment = async (
  payload: BookingAppointmentPayload,
) =>
  safeHttpRequest<BookingAppointmentPayload>(
    (token) =>
      httpClient.post<
        BookingAppointmentPayloadResponse,
        BookingAppointmentPayload
      >(API_ENDPOINT.BOOKING_SLOT, payload, token),
    true,
  );
