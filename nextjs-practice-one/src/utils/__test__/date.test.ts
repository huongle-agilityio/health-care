import { CalendarDate, today } from '@internationalized/date';
import dayjs from 'dayjs';

// Utils
import { todayWithFormat, isDateUnavailable, getDateWithFormat } from '..';

describe('date', () => {
  describe('todayWithFormat', () => {
    it("Should return today's date in default format", () => {
      const today = dayjs().format('YYYY-MM-DD');
      expect(todayWithFormat()).toBe(today);
    });

    it("Should return today's date in the specified format", () => {
      const format = 'DD/MM/YYYY';
      const today = dayjs().format(format);
      expect(todayWithFormat(format)).toBe(today);
    });
  });

  describe('isDateUnavailable', () => {
    it('Should return true for weekends', () => {
      const saturday = new CalendarDate(2025, 1, 11);
      const sunday = new CalendarDate(2025, 1, 12);

      expect(isDateUnavailable(saturday)).toBe(true);
      expect(isDateUnavailable(sunday)).toBe(true);
    });

    it('Should return true for the day before today', () => {
      const yesterday = today('UTC').subtract({ days: 1 });

      expect(isDateUnavailable(yesterday)).toBe(true);
    });
  });

  describe('getDateWithFormat', () => {
    it('Should format the date with default format', () => {
      const date = new CalendarDate(2025, 1, 10);
      const formattedDate = dayjs(date.toString()).format('YYYY-MM-DD');

      expect(getDateWithFormat(date)).toBe(formattedDate);
    });

    it('Should format the date with the specified format', () => {
      const date = new CalendarDate(2025, 1, 10);
      const format = 'DD/MM/YYYY';
      const formattedDate = dayjs(date.toString()).format(format);

      expect(getDateWithFormat(date, format)).toBe(formattedDate);
    });
  });
});
