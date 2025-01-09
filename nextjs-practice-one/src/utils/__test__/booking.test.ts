import dayjs from 'dayjs';

// Constants
import { BOOKING_STATUS } from '@/constants';

// Utils
import {
  getBookingStatus,
  getColorsWithStatusBooking,
  formatTimeSlotOption,
  getStatusTimeSlots,
} from '../booking';

describe('booking', () => {
  describe('getBookingStatus', () => {
    it('Should return EXPIRED for past dates', () => {
      const pastDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

      expect(getBookingStatus(pastDate)).toBe(BOOKING_STATUS.EXPIRED);
    });
    it("Should return TODAY for today's date", () => {
      const todayDate = dayjs().format('YYYY-MM-DD');

      expect(getBookingStatus(todayDate)).toBe(BOOKING_STATUS.TODAY);
    });

    it('Should return UPCOMING for future dates', () => {
      const futureDate = dayjs().add(1, 'day').format('YYYY-MM-DD');

      expect(getBookingStatus(futureDate)).toBe(BOOKING_STATUS.UPCOMING);
    });
  });

  describe('getColorsWithStatusBooking', () => {
    it('Should return correct color for TODAY status', () => {
      expect(getColorsWithStatusBooking(BOOKING_STATUS.TODAY)).toBe(
        'bg-amber-400',
      );
    });

    it('Should return correct color for UPCOMING status', () => {
      expect(getColorsWithStatusBooking(BOOKING_STATUS.UPCOMING)).toBe(
        'bg-lime-600',
      );
    });

    it('Should return correct color for EXPIRED status', () => {
      expect(getColorsWithStatusBooking(BOOKING_STATUS.EXPIRED)).toBe(
        'bg-red-400',
      );
    });

    it('Should return empty string for unknown status', () => {
      expect(getColorsWithStatusBooking('UNKNOWN' as BOOKING_STATUS)).toBe('');
    });
  });

  describe('formatTimeSlotOption', () => {
    it('Should format time slots correctly', () => {
      const timeSlots = [
        {
          id: 0,
          documentId: '1',
          date: '2023-01-01',
          timeSlot: {
            id: 0,
            documentId: '1',
            time: '10:00',
          },
        },
        {
          id: 0,
          documentId: '2',
          date: '2023-01-01',
          timeSlot: {
            id: 0,
            documentId: '2',
            time: '11:00',
          },
        },
      ];
      const expected = [{ time: '10:00' }, { time: '11:00' }];
      expect(formatTimeSlotOption(timeSlots)).toEqual(expected);
    });
  });

  describe('getStatusTimeSlots', () => {
    it('Should return correct status for time slots', () => {
      const bookingTimes = [
        { time: '10:00', documentId: '1' },
        { time: '11:00', documentId: '2' },
      ];
      const data = [
        {
          id: 0,
          documentId: '1',
          date: '2023-01-01',
          timeSlot: {
            id: 0,
            documentId: '1',
            time: '10:00',
          },
        },
        {
          id: 0,
          documentId: '2',
          date: '2023-01-01',
          timeSlot: {
            id: 0,
            documentId: '2',
            time: '14:00',
          },
        },
      ];
      const expected = [
        { value: '1', label: '10:00', isDisabled: true },
        { value: '2', label: '11:00', isDisabled: false },
      ];
      expect(getStatusTimeSlots(bookingTimes, data)).toEqual(expected);
    });
  });
});
