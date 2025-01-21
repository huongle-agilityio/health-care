import { Suspense } from 'react';
import { Metadata } from 'next';

// Actions
import { getDoctorById } from '@/actions';

// Components
import { Text } from '@/ui/components';
import { FormBooking, FormBookingSkeleton } from '@/ui/sections';

type Props = {
  params: Promise<{ doctorId: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { doctorId } = await params;

  const doctor = await getDoctorById(doctorId);

  return {
    title: `Booking Dr. ${doctor.data.name}`,
  };
};

const Page = async ({ params }: Props) => {
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
