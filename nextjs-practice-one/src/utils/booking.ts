import dayjs from 'dayjs';

// Constants
import { BOOKING_STATUS } from '@/constants';

/**
 * Get status booking with date
 * @param date {string}
 * @returns 'Expired' | 'ToDay' | 'Upcoming'
 */
export const getBookingStatus = (date: string) => {
  const now = dayjs();
  const isToday = now.isSame(dayjs(date), 'd');
  const isExpire = now.isAfter(dayjs(date)) && !isToday;

  if (isExpire) {
    return BOOKING_STATUS.EXPIRED;
  }

  if (isToday) {
    return BOOKING_STATUS.TODAY;
  }

  return BOOKING_STATUS.UPCOMING;
};
