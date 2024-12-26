import { CURRENT_PAGE, PAGE_SIZE } from './pagination';

// Types
import { DoctorFilterParams } from '@/types';

const QUERY_FILTER_URL = {
  PAGINATION: (page: number, pageSize: number) =>
    (page &&
      pageSize &&
      `&pagination[pageSize]=${pageSize}&pagination[page]=${page}`) ||
    '',
  BY_EXPERIENCE: (expStart: number, expEnd: number) =>
    (expEnd &&
      expStart &&
      `&filters[experience][$between][0]=${expStart}&filters[experience][$between][1]=${expEnd}`) ||
    '',
  BY_RATING: (rating: number) =>
    (rating && `&filters[rating][$eq]=${rating}`) || '',
  BY_FEE: (fee: number) => (fee && `&filters[fee][$eq]=${fee}`) || '',
  BY_SPECIALTY: (specialty: string) =>
    specialty && `&filters[specialty][name][$eq]=${specialty}`,
};

export const QUERY_URL = {
  DOCTORS: ({
    expStart = 0,
    expEnd = 0,
    rating = 0,
    fee = 0,
    specialty = '',
    page = CURRENT_PAGE,
    pageSize = PAGE_SIZE,
  }: DoctorFilterParams) =>
    `?populate[specialty][fields][0]=name${QUERY_FILTER_URL.BY_EXPERIENCE(expStart, expEnd)}${QUERY_FILTER_URL.BY_RATING(rating)}${QUERY_FILTER_URL.BY_FEE(fee)}${QUERY_FILTER_URL.BY_SPECIALTY(specialty)}${QUERY_FILTER_URL.PAGINATION(
      page,
      pageSize,
    )}`,
  DOCTOR_BY_ID: (id: string) => `/${id}?populate[specialty][fields][0]=name`,
  DOCTOR_TIME_SLOT: (doctorId: string, date: string) =>
    `?filters[date][$eq]=${date}&populate[timeSlotId][fields][0]=time&filters[doctorId][documentId][$eq]=${doctorId}`,
};
