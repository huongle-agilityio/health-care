import { CalendarDate, parseDate } from '@internationalized/date';
import dayjs from 'dayjs';

// Utils
import { todayWithFormat, getDateWithFormat, isDateAvailable } from '..';

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

  describe('isDateAvailable', () => {
    const mockDate = parseDate('2025-01-15');

    it('Should return false for weekends', () => {
      const saturday = new CalendarDate(2025, 1, 11);
      const sunday = new CalendarDate(2025, 1, 12);

      expect(isDateAvailable(saturday)).toBe(false);
      expect(isDateAvailable(sunday)).toBe(false);
    });

    it('Should return false for the day before date passed in', () => {
      const yesterday = mockDate.subtract({ days: 1 });

      expect(isDateAvailable(yesterday)).toBe(false);
    });

    it('Should return true for date passed in and future dates', () => {
      const todayDate = mockDate;
      const futureDate = mockDate.add({ days: 1 });

      expect(!isDateAvailable(todayDate)).toBe(true);
      expect(!isDateAvailable(futureDate)).toBe(true);
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
