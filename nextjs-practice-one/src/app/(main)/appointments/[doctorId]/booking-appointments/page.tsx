import { Suspense } from 'react';
import { Metadata } from 'next';

// Components
import { Text } from '@/ui/components';
import { FormBooking, FormBookingSkeleton } from '@/ui/sections';

export const metadata: Metadata = {
  title: 'Booking Appointments',
};

const Page = async ({ params }: { params: Promise<{ doctorId: string }> }) => {
  const { doctorId } = await params;

  return (
    <div className="container">
      <div className="flex flex-col pt-[50px] 2xl:pt-[80px] pb-20 items-center">
        <Text variants="h1" color="tertiary" className="text-2xl md:text-4xl">
          Booking Appointments
        </Text>
      </div>
      <Suspense fallback={<FormBookingSkeleton />}>
        <FormBooking doctorId={doctorId} />
      </Suspense>
    </div>
  );
};

export default Page;
