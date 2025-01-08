import { DateValue } from '@nextui-org/react';
import dayjs from 'dayjs';

export const today = dayjs();
export const todayWithFormat = (format: string = 'YYYY-MM-DD') =>
  dayjs().format(format);

/**
 * Checks if the given date is unavailable.
 *
 * The date is considered unavailable if it's a weekend (Saturday or Sunday)
 * or if it's the day before the current date.
 *
 * @param {DateValue} date The date to check.
 * @returns A boolean indicating whether the date is unavailable.
 */
export const isDateUnavailable = (date: DateValue): boolean => {
  const targetDate = dayjs(date.toString());

  return (
    // Disable weekends
    targetDate.day() === 0 ||
    targetDate.day() === 6 ||
    // Disable the day before
    targetDate.isBefore(today, 'day')
  );
};
/**
 * Formats a given date in a desired format.
 *
 * @param {DateValue} date The date to format.
 * @param {string} format The desired format.
 * @returns {string} The formatted date.
 */
export const getDateWithFormat = (
  date: DateValue,
  format: string = 'YYYY-MM-DD',
): string => dayjs(date.toString()).format(format);
