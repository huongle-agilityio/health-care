'use server';

import { cookies } from 'next/headers';

// Services
import { httpClient } from '@/services';

// Constants
import {
  API_ENDPOINT,
  COOKIES_KEYS,
  QUERY_FILTER_URL,
  QUERY_URL,
} from '@/constants';

// Types
import {
  BookingAppointmentPayload,
  BookingAppointmentPayloadResponse,
  BookingSlotResponse,
  DoctorTimeSlotsResponse,
  TimeSlotResponse,
} from '@/types';

// Utils
import { getErrorMessage } from '@/utils';

export const getTimeSlot = async () => {
  try {
    const data = await httpClient.get<TimeSlotResponse>(
      `${API_ENDPOINT.TIME_SLOT}?${QUERY_FILTER_URL.SORT_BY_TIME}`,
    );

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

export const getBookingAppointmentById = async (userId: number) => {
  try {
    const token = (await cookies()).get(COOKIES_KEYS.TOKEN)?.value;
    const data = await httpClient.get<BookingSlotResponse>(
      `${API_ENDPOINT.BOOKING_SLOT}${QUERY_URL.APPOINTMENT_BY_USER_ID(userId)}`,
      token,
    );

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

export const getBookingTimeSlotById = async (
  doctorId: string,
  date: string,
) => {
  try {
    const token = (await cookies()).get(COOKIES_KEYS.TOKEN)?.value;
    const data = await httpClient.get<DoctorTimeSlotsResponse>(
      `${API_ENDPOINT.BOOKING_SLOT}${QUERY_URL.BOOKING_TIME_SLOT(doctorId, date)}`,
      token,
    );

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

export const createBookingAppointment = async (
  payload: BookingAppointmentPayload,
) => {
  try {
    const token = (await cookies()).get(COOKIES_KEYS.TOKEN)?.value;
    const data = await httpClient.post<
      BookingAppointmentPayloadResponse,
      BookingAppointmentPayload
    >(API_ENDPOINT.BOOKING_SLOT, payload, token);

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: getErrorMessage(error),
    };
  }
};
