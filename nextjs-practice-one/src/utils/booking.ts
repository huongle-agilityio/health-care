import dayjs from 'dayjs';
import { today } from './date';

// Constants
import { BOOKING_STATUS } from '@/constants';

// Types
import { BookingTimeSlots, OptionCheckBox, TimeSlot } from '@/types';

/**
 * Get status booking with date
 * @param date {string}
 * @returns 'Expired' | 'ToDay' | 'Upcoming'
 */
export const getBookingStatus = (date: string) => {
  const isToday = today.isSame(dayjs(date), 'd');
  const isExpire = today.isAfter(dayjs(date)) && !isToday;

  if (isExpire) {
    return BOOKING_STATUS.EXPIRED;
  }

  if (isToday) {
    return BOOKING_STATUS.TODAY;
  }

  return BOOKING_STATUS.UPCOMING;
};

/**
 * Returns the corresponding color based on the booking status.
 *
 * @param status - The booking status, which can be 'TODAY', 'UPCOMING', or 'EXPIRED'.
 * @returns A string representing the color of the booking status.
 */
export function getColorsWithStatusBooking(status: BOOKING_STATUS): string {
  const chipColors = {
    [BOOKING_STATUS.TODAY]: 'bg-amber-400',
    [BOOKING_STATUS.UPCOMING]: 'bg-lime-600',
    [BOOKING_STATUS.EXPIRED]: 'bg-red-400',
  };

  return chipColors[status] || '';
}

/**
 * Function format time slots to array
 * @param timeSlots
 * @returns TimeSlot[]
 */
export const formatTimeSlotOption = (
  timeSlots: BookingTimeSlots[],
): TimeSlot[] =>
  timeSlots.map((item) => ({
    time: item.timeSlot.time,
  }));

/**
 * Function get time slots disabled or not
 * @param bookingTimes
 * @param data
 * @returns OptionCheckBox[]
 */
export const getStatusTimeSlots = (
  bookingTimes: TimeSlot[],
  data: BookingTimeSlots[],
): OptionCheckBox[] =>
  bookingTimes.map((bookingTime) => ({
    value: bookingTime.documentId || '',
    label: bookingTime.time,
    isDisabled: formatTimeSlotOption(data).some(
      (item) => item.time === bookingTime.time,
    ),
  }));
