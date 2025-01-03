'use client';

import { useEffect, useState } from 'react';

// Apis
import { getBookingAppointmentById } from '@/actions';

// Components
import { BookingCard, Text } from '@/components';
import { ListBookingSkeleton } from './ListBookingSkeleton';

// Stores
import { useToastStore, useUserStore } from '@/stores';

// Types
import { BookingSlot } from '@/types';

// Constants

export const ListBooking = () => {
  const [bookingAppointments, setBookingAppointments] = useState<BookingSlot[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Stores
  const userId = useUserStore((state) => state.user?.id);
  const { showToast } = useToastStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await getBookingAppointmentById(userId || 0);
      setLoading(false);

      if (error) {
        return showToast({ description: error });
      }

      setBookingAppointments(data);
    };

    fetchData();
  }, [showToast, userId]);

  return loading ? (
    <ListBookingSkeleton />
  ) : !bookingAppointments.length ? (
    <div className="w-full flex justify-center px-10 py-25">
      <Text color="tertiary">No results found.</Text>
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
