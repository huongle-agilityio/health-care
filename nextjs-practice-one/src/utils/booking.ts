import { isPast, isToday } from './date';

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
  if (isPast(date)) return BOOKING_STATUS.EXPIRED;

  if (isToday(date)) return BOOKING_STATUS.TODAY;

  return BOOKING_STATUS.UPCOMING;
};

/**
 * Function to format time slots and determine their status
 * @param bookingTimes - Array of booking times
 * @param data - Array of booking time slots from data source
 * @returns OptionCheckBox[]
 */
export const formatBookingTimeSlotsWithStatus = (
  bookingTimes: TimeSlot[],
  data: BookingTimeSlots[],
): OptionCheckBox[] => {
  // Format the data time slots to TimeSlot array
  const formattedTimeSlots = data.map(({ timeSlot: { time } }) => ({
    time,
  }));

  // Map bookingTimes to OptionCheckBox array with status check
  return bookingTimes.map((bookingTime) => ({
    value: bookingTime.documentId || '',
    label: bookingTime.time,
    isDisabled: formattedTimeSlots.some(
      (item) => item.time === bookingTime.time,
    ),
  }));
};
