import { isPast, isToday } from './date';

// Constants
import { BOOKING_STATUS } from '@/constants';
import { WORK_EXPERIENCE_YEARS } from '@/constants/mocks';

// Types
import {
  BookingSlot,
  BookingSlotsByDate,
  BookingTimeSlots,
  OptionCheckBox,
  TimeSlot,
} from '@/types';
import dayjs from 'dayjs';

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

export const formatWorkingExperience = Object.entries(
  WORK_EXPERIENCE_YEARS,
).map(([key, [min, max]]) => ({
  value: key,
  label: `${min}-${max} Years`,
}));

/**
 * Sorts booking appointments based on their status.
 * Ex: Today -> Upcoming -> Expired
 *
 * @param {BookingSlot[]} bookingAppointments - The array of booking appointments to sort.
 * @returns {BookingSlot[]} The sorted array of booking appointments.
 */
export const sortedAppointments = (
  bookingAppointments: BookingSlot[],
): BookingSlot[] => {
  const statusOrder = {
    [BOOKING_STATUS.TODAY]: 0,
    [BOOKING_STATUS.UPCOMING]: 1,
    [BOOKING_STATUS.EXPIRED]: 2,
  };

  const sortedAppointments = [...bookingAppointments].sort(
    (appointment1, appointment2) => {
      const status1 = statusOrder[getBookingStatus(appointment1.date)];
      const status2 = statusOrder[getBookingStatus(appointment2.date)];

      return status1 - status2;
    },
  );

  return sortedAppointments;
};

/**
 * Groups booking time slots data by date and formats it
 * to the desired response structure.
 * Ex: BookingSlot[] -> [{ date: string, bookings: BookingSlot[] }]
 *
 * @param {BookingSlot[]} data - The array of booking time slots to group and format.
 * @returns {BookingSlotsByDate} The grouped and formatted booking time slots.
 */
export const groupAndFormatBookings = (data: BookingSlot[]) => {
  // Group data by date
  const groupedData = data.reduce<BookingSlotsByDate>(
    (groupedBookings, booking) => ({
      ...groupedBookings,
      [booking.date]: [...(groupedBookings[booking.date] || []), booking],
    }),
    {},
  );

  // Format data
  // Ex: { date: '2023-01-01', bookings: [BookingSlot] }
  return Object.entries(groupedData).map(([date, bookings]) => ({
    date,
    bookings,
  }));
};

/**
 * Formats a given time string to a 12-hour clock format with AM/PM.
 * Ex: 10:00 -> 10:00 AM
 *
 * @param {string} time The time string in 'HH:MM' format.
 * @returns {string} The formatted time string in 'h:mm AM/PM' format.
 */
export const formatTime = (time: string): string => {
  const [hour, minute] = time.split(':').map(Number);

  return dayjs().hour(hour).minute(minute).format('h:mm A');
};
