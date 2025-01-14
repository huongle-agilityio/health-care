import dayjs from 'dayjs';

// Constants
import { BOOKING_STATUS } from '@/constants';

import { TIME_SLOTS_MOCK } from '@/constants/mocks';

// Utils
import { getBookingStatus, formatBookingTimeSlotsWithStatus } from '../booking';

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

  describe('formatBookingTimeSlotsWithStatus', () => {
    it('Should return correct status for time slots', () => {
      const bookingTimes = [
        { time: '10:00', documentId: '1' },
        { time: '11:00', documentId: '2' },
      ];
      const expected = [
        { value: '1', label: '10:00', isDisabled: true },
        { value: '2', label: '11:00', isDisabled: true },
      ];

      expect(
        formatBookingTimeSlotsWithStatus(bookingTimes, TIME_SLOTS_MOCK),
      ).toEqual(expected);
    });
  });
});
