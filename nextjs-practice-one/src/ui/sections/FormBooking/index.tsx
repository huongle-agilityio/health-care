// Apis
import { getDoctorById, getTimeSlot } from '@/actions';

// Components
import { FormBookingBase } from './FormBookingBase';

// Config
import { auth } from '@/config';

export const FormBooking = async ({ doctorId }: { doctorId: string }) => {
  const session = await auth();
  const userInfo = session?.user;

  const [doctor, times] = await Promise.all([
    getDoctorById(doctorId),
    getTimeSlot(),
  ]);

  return (
    <FormBookingBase
      doctorId={doctorId}
      userInfo={userInfo}
      doctor={doctor.data}
      times={times.data}
    />
  );
};
