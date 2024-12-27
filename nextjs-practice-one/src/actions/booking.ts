// Services
import { httpClient } from '@/services';

// Constants
import { API_ENDPOINT, QUERY_URL } from '@/constants';

// Types
import {
  BookingSlotResponse,
  BookingAppointmentPayload,
  BookingAppointmentPayloadResponse,
  TimeSlotResponse,
} from '@/types';

// Utils
import { getErrorMessage } from '@/utils';

export const getTimeSlot = async () => {
  try {
    const data = await httpClient.get<TimeSlotResponse>(API_ENDPOINT.TIME_SLOT);

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

export const getBookingAppointment = async (userId: number) => {
  try {
    const data = await httpClient.get<BookingSlotResponse>(
      `${API_ENDPOINT.BOOKING_SLOT}${QUERY_URL.APPOINTMENT_BY_USER_ID(userId)}`,
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
    const data = await httpClient.post<
      BookingAppointmentPayloadResponse,
      BookingAppointmentPayload
    >(API_ENDPOINT.BOOKING_SLOT, payload);

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
