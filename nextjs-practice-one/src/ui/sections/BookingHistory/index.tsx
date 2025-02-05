// Apis
import { getBookingHistory } from '@/actions';

// Constants
import { BOOKING_HISTORY_SECTION_ID } from '@/constants';

// Components
import { Pagination, Text, BookingHistoryItem } from '@/ui/components';
import { isToday } from '@/utils';
import dayjs from 'dayjs';

interface BookingHistoryProps {
  queryString: string;
}

export const BookingHistory = async ({ queryString }: BookingHistoryProps) => {
  const { data: bookings, meta, error } = await getBookingHistory(queryString);
  const { page: currentPage = 1, pageCount = 0 } = meta?.pagination || {};

  return (
    <>
      {error ? (
        <div className="px-10 py-25">
          <Text color="error">{error}</Text>
        </div>
      ) : (
        <>
          {!bookings.length ? (
            <div className="px-10 py-25">
              <Text color="tertiary">No results found.</Text>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-10 md:gap-24">
              {bookings.map(({ date, bookings }, index) => (
                <div key={`booking-history-${index}`}>
                  <Text size="xl" color="tertiary" className="font-bold mt-5">
                    {dayjs(date).format('DD/MM/YYYY')}
                    {isToday(date) && ' - Today'}
                  </Text>
                  {bookings.map(({ doctor, timeSlot, user, date }, index) => {
                    const { avatar, name, specialty } = doctor || {};

                    return (
                      <BookingHistoryItem
                        key={`booking-history-item-${index}`}
                        avatar={avatar}
                        specialty={specialty?.name}
                        date={date}
                        name={name}
                        patient={user?.name}
                        time={timeSlot?.time}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
          <Pagination
            page={currentPage}
            total={pageCount}
            scrollTo={`#${BOOKING_HISTORY_SECTION_ID}`}
          />
        </>
      )}
    </>
  );
};
