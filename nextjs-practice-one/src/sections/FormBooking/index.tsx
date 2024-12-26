import { Suspense } from 'react';
import { Skeleton } from '@nextui-org/react';

// Apis
import { getDoctorById } from '@/actions';

// Components
import { FormBookingBase } from './FormBookingBase';

export const FormBooking = async ({ doctorId }: { doctorId: string }) => {
  const { data } = await getDoctorById(doctorId);

  return (
    <Suspense fallback={<Skeleton />}>
      <FormBookingBase doctorId={doctorId} doctor={data} />
    </Suspense>
  );
};
