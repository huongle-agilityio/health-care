import { Suspense } from 'react';
import { Metadata } from 'next';

// Components
import { Text } from '@/ui/components';
import { BookingHistory, BookingHistorySkeleton } from '@/ui/sections';

// Utils
import { BOOKING_HISTORY_SECTION_ID } from '@/constants';

export const metadata: Metadata = {
  title: 'Booking History',
};

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ page: string }>;
}) => {
  const params = await searchParams;
  const queryString = new URLSearchParams(
    params && Object.entries(params),
  ).toString();

  return (
    <div className="container">
      <div
        id={BOOKING_HISTORY_SECTION_ID}
        className="flex flex-col pt-[50px] 2xl:pt-[80px] pb-20 items-center"
      >
        <Text
          variants="h1"
          color="tertiary"
          size="4xl"
          className="text-[40px] md:text-[60px]"
        >
          Booking History
        </Text>
      </div>

      <div className="flex flex-col md:flex-row w-full flex-wrap gap-15 justify-center min-h-[500px]">
        <Suspense fallback={<BookingHistorySkeleton />}>
          <BookingHistory queryString={queryString} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
