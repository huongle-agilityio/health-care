import { Metadata } from 'next';
import { Suspense } from 'react';

// Components
import { Text } from '@/ui/components';
import { ListBooking, ListBookingSkeleton } from '@/ui/sections';
import { getUserFromSession } from '@/utils/auth';

export const metadata: Metadata = {
  title: 'Schedules',
};

const Page = async () => {
  const { id } = await getUserFromSession();

  return (
    <div className="container">
      <div className="flex flex-col pt-[50px] 2xl:pt-[80px] pb-20 items-center">
        <Text
          variants="h1"
          color="tertiary"
          size="4xl"
          className="text-[40px] md:text-[60px]"
        >
          My Schedules
        </Text>
      </div>

      <div className="min-h-[500px]">
        <div className="w-fit flex flex-col md:flex-row w-full flex-wrap gap-15">
          <Suspense fallback={<ListBookingSkeleton />}>
            <ListBooking userId={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
