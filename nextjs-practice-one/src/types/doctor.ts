import { TimeSlot } from './timeSlot';
import { Specialty } from './specialty';
import { ApiPaginationResponse } from './api';

// Constants
import { WORK_EXPERIENCE_YEARS } from '@/constants/mocks';

export interface DoctorFilterParams {
  page?: number;
  pageSize?: number;
  rating?: number;
  experience?: keyof typeof WORK_EXPERIENCE_YEARS;
  minExperience?: number;
  maxExperience?: number;
  fee?: number;
  specialty?: string;
}

export interface BookingTimeSlots {
  id: number;
  documentId?: string;
  date: string;
  timeSlot: TimeSlot;
}

export interface Doctor {
  id: number;
  documentId?: string;
  name: string;
  fee: number;
  rating: number;
  avatar: string;
  experience: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  specialty?: Specialty;
  bookingTimeSlots?: BookingTimeSlots[];
}

export interface DoctorPayload {
  id?: string;
  name: string;
  fee: number;
  rating: number;
  experience: number;
  avatar: string | File;
  specialty: string;
}

export type DoctorResponse = ApiPaginationResponse<Doctor>;
export type ListDoctorResponse = ApiPaginationResponse<Doctor[]>;
export type DoctorTimeSlotsResponse = ApiPaginationResponse<BookingTimeSlots[]>;
