import { ApiPaginationResponse } from './api';

export interface BookingAppointmentPayload {
  data: { date: string; timeSlotId: string; doctorId: string; userId: number };
}

export type BookingAppointmentPayloadResponse =
  ApiPaginationResponse<BookingAppointmentPayload>;
