// Apis
import { getDoctorById, getTimeSlot } from '@/actions';

// Components
import { FormBookingBase } from './FormBookingBase';

// Config
import { getUserFromSession } from '@/utils/auth';

export const FormBooking = async ({ doctorId }: { doctorId: string }) => {
  const userInfo = await getUserFromSession();

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
