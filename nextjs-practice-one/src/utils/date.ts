import { DateValue } from '@nextui-org/react';
import dayjs from 'dayjs';

export const today = dayjs();
export const todayWithFormat = (format: string = 'YYYY-MM-DD') =>
  dayjs().format(format);

/**
 * Determines if the given date is the same as today's date.
 *
 * @param {string} date The date to check in string format.
 * @returns {boolean} True if the date is today, false otherwise.
 */

export const isToday = (date: string) => {
  return today.isSame(dayjs(date), 'day');
};

/**
 * Determines if the given date is before today's date.
 *
 * @param {string} date The date to check in string format.
 * @returns {boolean} True if the date is in the past, false otherwise.
 */
export const isPast = (date: string) => {
  return today.isAfter(dayjs(date), 'day');
};

/**
 * Determines if the given date is in the future.
 *
 * @param {string} date The date to check in string format.
 * @returns {boolean} True if the date is in the future, false otherwise.
 */
export const isFuture = (date: string) => {
  return today.isBefore(dayjs(date), 'day');
};

/**
 * Checks if the given date is available.
 *
 * The date is considered available if it's not a weekend (Saturday or Sunday)
 * and it's not the day before the current date.
 *
 * @param {DateValue} date The date to check.
 * @returns A boolean indicating whether the date is available.
 */
export const isDateAvailable = (date: DateValue): boolean => {
  const targetDate = dayjs(date.toString());

  // Check if the date is a weekend ( Saturday or Sunday )
  if (targetDate.day() === 0) return false;
  if (targetDate.day() === 6) return false;

  // Check if the date is the day before today
  if (targetDate.isBefore(today, 'day')) return false;

  return true;
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
