import { ApiPaginationResponse } from './api';

export interface TimeSlot {
  id?: number;
  documentId?: string;
  time: string;
}

export type TimeSlotResponse = ApiPaginationResponse<TimeSlot>;
