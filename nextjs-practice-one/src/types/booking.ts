import { User } from './user';
import { Doctor } from './doctor';
import { TimeSlot } from './timeSlot';
import { ApiPaginationResponse } from './api';

export interface BookingSlot {
  date: string;
  doctor?: Doctor;
  user?: User;
  timeSlot?: TimeSlot;
}

export interface BookingHistory {
  date: string;
  bookings: BookingSlot[];
}

export interface BookingSlotsByDate {
  [date: string]: BookingSlot[];
}

export interface BookingAppointmentPayload {
  data: { date: string; timeSlot: string; doctor: string; user: string };
}

export type BookingAppointmentPayloadResponse =
  ApiPaginationResponse<BookingAppointmentPayload>;
export type BookingSlotResponse = ApiPaginationResponse<BookingSlot[]>;
export type BookingHistoryResponse = ApiPaginationResponse<BookingHistory[]>;
