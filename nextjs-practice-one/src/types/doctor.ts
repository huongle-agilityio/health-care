import { Specialty } from './specialty';
import { ApiPaginationResponse } from './api';
import { TimeSlot } from './timeSlot';

export interface DoctorFilterParams {
  page?: number;
  pageSize?: number;
  rating?: number;
  experience?: string;
  expStart?: number;
  expEnd?: number;
  fee?: number;
  specialty?: string;
}

export interface DoctorTimeSlots {
  id: number;
  documentId?: string;
  date: string;
  timeSlotId: TimeSlot;
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
  doctorTimeSlots?: DoctorTimeSlots[];
}

export type DoctorResponse = ApiPaginationResponse<Doctor>;
export type DoctorTimeSlotsResponse = ApiPaginationResponse<DoctorTimeSlots>;
