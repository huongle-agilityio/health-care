import dayjs from 'dayjs';

// Constants
import { BOOKING_STATUS, BOOKING_TIMES } from '@/constants';

// Types
import { DoctorTimeSlots, TimeSlot } from '@/types';

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

export const formatTimeSlotOption = (
  timeSlots: DoctorTimeSlots[],
): TimeSlot[] =>
  timeSlots.map((item) => ({
    time: item.timeSlotId.time,
  }));

export const getStatusTimeSlots = (data: DoctorTimeSlots[]) =>
  BOOKING_TIMES.map((bookingTime) => ({
    ...bookingTime,
    isDisabled: formatTimeSlotOption(data).some(
      (item) => item.time === bookingTime.value,
    ),
  }));
