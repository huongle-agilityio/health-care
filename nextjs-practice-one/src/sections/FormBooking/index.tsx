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
    <FormBookingBase
      doctorId={doctorId}
      doctor={doctor.data}
      times={times.data}
    />
  );
};
