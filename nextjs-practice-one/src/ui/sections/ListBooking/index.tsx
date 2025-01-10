// Apis
import { getBookingAppointmentById } from '@/actions';

// Components
import { BookingCard, Text } from '@/ui/components';

interface ListBookingProps {
  userId: string;
}

export const ListBooking = async ({ userId }: ListBookingProps) => {
  const { data: bookingAppointments, error } =
    await getBookingAppointmentById(userId);

  return !bookingAppointments.length || error ? (
    <div className="w-full flex justify-center px-10 py-25">
      {error ? (
        <Text color="error">{error}</Text>
      ) : (
        <Text color="tertiary">No results found.</Text>
      )}
    </div>
  ) : (
    bookingAppointments.map(({ date, doctor, timeSlot }, index) => (
      <BookingCard
        key={`booking-${index}`}
        date={date}
        imageSrc={doctor?.avatar || ''}
        name={doctor?.name || ''}
        time={timeSlot?.time || ''}
      />
    ))
  );
};
