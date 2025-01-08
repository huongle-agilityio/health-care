import { ApiPaginationResponse } from './api';

export interface BookingAppointmentPayload {
  data: { date: string; timeSlot: string; doctor: string; user: string };
}

export type BookingAppointmentPayloadResponse =
  ApiPaginationResponse<BookingAppointmentPayload>;
