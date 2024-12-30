import { Suspense } from 'react';
import { Metadata } from 'next';

// Components
import { FormBooking } from '@/sections';
import { Loading, Text } from '@/components';

export const metadata: Metadata = {
  title: 'Booking Appointments',
};

const Page = async ({ params }: { params: Promise<{ doctorId: string }> }) => {
  const { doctorId } = await params;

  return (
    <div className="container">
      <div className="flex flex-col pt-[50px] 2xl:pt-[80px] pb-20 items-center">
        <Text color="tertiary" className="text-2xl md:text-4xl">
          Booking Appointments
        </Text>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center pt-20">
            <Loading />
          </div>
        }
      >
        <FormBooking doctorId={doctorId} />
      </Suspense>
    </div>
  );
};

export default Page;
