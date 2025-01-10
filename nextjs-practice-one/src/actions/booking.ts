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

export const getTimeSlot = async () =>
  safeHttpRequest<TimeSlot[]>(async () => {
    const url = `${API_ENDPOINT.TIME_SLOT}?${QUERY_FILTER_URL.SORT_BY_TIME}`;
    return await httpClient.get<TimeSlotResponse>(url, '', {
      cache: 'force-cache',
    });
  });

export const getBookingAppointmentById = async (userId: string) =>
  safeHttpRequest<BookingSlot[]>(async (token) => {
    const url = `${API_ENDPOINT.BOOKING_SLOT}${QUERY_URL.APPOINTMENT_BY_USER_ID(userId)}`;
    return await httpClient.get<BookingSlotResponse>(url, token);
  }, true);

export const getBookingTimeSlotById = async (doctorId: string, date: string) =>
  safeHttpRequest<BookingTimeSlots[]>(async (token) => {
    const url = `${API_ENDPOINT.BOOKING_SLOT}${QUERY_URL.BOOKING_TIME_SLOT(doctorId, date)}`;
    return await httpClient.get<DoctorTimeSlotsResponse>(url, token);
  }, true);

export const createBookingAppointment = async (
  payload: BookingAppointmentPayload,
) =>
  safeHttpRequest<BookingAppointmentPayload>(
    async (token) =>
      await httpClient.post<
        BookingAppointmentPayloadResponse,
        BookingAppointmentPayload
      >(API_ENDPOINT.BOOKING_SLOT, payload, token),
    true,
  );
