import { Suspense } from 'react';
import { Spinner } from '@nextui-org/react';

// Components
import { Text } from '@/components';
import { FormBooking } from '@/sections';

const Page = async ({ params }: { params: Promise<{ doctorId: string }> }) => {
  const { doctorId } = await params;

  return (
    <div className="container">
      <div className="flex flex-col pt-[50px] 2xl:pt-[80px] pb-20 items-center">
        <Text color="tertiary" size="4xl">
          Booking Appointments
        </Text>
      </div>
      <Suspense
        fallback={
          <Spinner
            label="Loading..."
            color="current"
            classNames={{
              circle1: 'w-[40px] h-[40px] left-6',
              circle2: 'w-[40px] h-[40px] left-6',
              base: 'w-[80px] h-[80px]',
              wrapper: 'w-[80px] h-[80px]',
              label: 'text-primary-100',
            }}
          />
        }
      >
        <FormBooking doctorId={doctorId} />
      </Suspense>
    </div>
  );
};

export default Page;
