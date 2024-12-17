import { CURRENT_PAGE, PAGE_SIZE } from './pagination';

export const QUERY_URL = {
  DOCTORS_AVAILABLE_FROM_TODAY: (
    today: string,
    page: number = CURRENT_PAGE,
    pageSize: number = PAGE_SIZE,
  ) =>
    `?populate[doctorTimeSlots][fields][0]=isAvailable&populate[doctorTimeSlots][fields][1]=date&populate[doctorTimeSlots][filters][isAvailable][$eq]=true&populate[doctorTimeSlots][filters][date][$gte]=${today}&populate[specialty][fields][0]=name&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
};
