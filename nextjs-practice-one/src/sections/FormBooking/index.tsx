import { Suspense } from 'react';
import { Skeleton } from '@nextui-org/react';

// Apis
import { getDoctorById, getTimeSlot } from '@/actions';

// Components
import { FormBookingBase } from './FormBookingBase';

export const FormBooking = async ({ doctorId }: { doctorId: string }) => {
  const [doctor, times] = await Promise.all([
    getDoctorById(doctorId),
    getTimeSlot(),
  ]);

  return (
    <Suspense fallback={<Skeleton />}>
      <FormBookingBase
        doctorId={doctorId}
        doctor={doctor.data}
        times={times.data}
      />
    </Suspense>
  );
};
