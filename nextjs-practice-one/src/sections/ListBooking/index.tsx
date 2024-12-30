'use client';

import { useEffect, useState } from 'react';

// Apis
import { getBookingAppointment } from '@/actions';

// Components
import { BookingCard } from '@/components';
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
      const { data, error } = await getBookingAppointment(userId || 0);
      setLoading(false);

      if (error) {
        return showToast({ description: error });
      }

      setBookingAppointments(data);
    };

    fetchData();
  }, [showToast, userId]);

  return loading || bookingAppointments.length === 0 ? (
    <ListBookingSkeleton />
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
