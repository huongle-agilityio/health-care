import { isPast, isToday } from './date';

// Constants
import { BOOKING_STATUS } from '@/constants';

// Types
import { BookingTimeSlots, OptionCheckBox, TimeSlot } from '@/types';

/**
 * Gets the status of a booking based on the given date.
 *
 * @param {string} date The date to determine the status for.
 * @returns {BOOKING_STATUS} The status of the booking.
 */
export const getBookingStatus = (date: string): BOOKING_STATUS => {
  if (isPast(date)) return BOOKING_STATUS.EXPIRED;

  if (isToday(date)) return BOOKING_STATUS.TODAY;

  return BOOKING_STATUS.UPCOMING;
};

/**
 * Formats booking time slots data to OptionCheckBox array
 * If the time slot is already in the data, the option is disabled.
 *
 * @param {TimeSlot[]} bookingTimes The time slots to format.
 * @param {BookingTimeSlots[]} data The booking time slots data.
 * @returns {OptionCheckBox[]} The formatted time slots with status check.
 */
export const formatBookingTimeSlotsWithStatus = (
  bookingTimes: TimeSlot[],
  data: BookingTimeSlots[],
): OptionCheckBox[] => {
  const formattedTimeSlots = data.map(({ timeSlot: { time } }) => ({
    time,
  }));

  return bookingTimes.map((bookingTime) => ({
    value: bookingTime.documentId || '',
    label: bookingTime.time,
    isDisabled: formattedTimeSlots.some(
      (item) => item.time === bookingTime.time,
    ),
  }));
};
