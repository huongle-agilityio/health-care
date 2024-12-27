import { ApiPaginationResponse } from './api';
import { Doctor } from './doctor';
import { User } from './user';

export interface TimeSlot {
  id?: number;
  documentId?: string;
  time: string;
}

export interface BookingSlot {
  date: string;
  doctor?: Doctor;
  user?: User;
  timeSlot?: TimeSlot;
}

export type TimeSlotResponse = ApiPaginationResponse<TimeSlot>;
export type BookingSlotResponse = ApiPaginationResponse<BookingSlot>;
