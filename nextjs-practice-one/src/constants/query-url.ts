import { CURRENT_PAGE, PAGE_SIZE } from './pagination';

const QUERY_FILTER_URL = {
  PAGINATION: (page: string, pageSize: string) =>
    page &&
    pageSize &&
    `&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
  BY_EXPERIENCE: (expStart: string, expEnd: string) =>
    expEnd &&
    expStart &&
    `&filters[experience][$between][0]=${expStart}&filters[experience][$between][1]=${expEnd}`,
  BY_RATING: (rating: string) => rating && `&filters[rating][$eq]=${rating}`,
  BY_FEE: (fee: string) => fee && `&filters[fee][$eq]=${fee}`,
  BY_SPECIALTY: (specialty: string) =>
    specialty && `&filters[specialty][name][$eq]=${specialty}`,
};

export const QUERY_URL = {
  DOCTORS: ({
    expStart,
    expEnd,
    rating,
    fee,
    specialty,
    page = `${CURRENT_PAGE}`,
    pageSize = `${PAGE_SIZE}`,
  }: {
    expStart: string;
    expEnd: string;
    rating: string;
    fee: string;
    specialty: string;
    page?: string;
    pageSize?: string;
  }) =>
    `?populate[specialty][fields][0]=name${QUERY_FILTER_URL.BY_EXPERIENCE(expStart, expEnd)}${QUERY_FILTER_URL.BY_RATING(rating)}${QUERY_FILTER_URL.BY_FEE(fee)}${QUERY_FILTER_URL.BY_SPECIALTY(specialty)}${QUERY_FILTER_URL.PAGINATION(
      page,
      pageSize,
    )}`,
  DOCTOR_BY_ID: (id: string) => `/${id}?populate[specialty][fields][0]=name`,
  DOCTOR_TIME_SLOT: (doctorId: string, date: string) =>
    `?filters[date][$eq]=${date}&populate[timeSlotId][fields][0]=time&filters[doctorId][documentId][$eq]=${doctorId}`,
};
