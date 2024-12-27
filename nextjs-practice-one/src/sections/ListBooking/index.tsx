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
      if (!userId) {
        showToast({ description: 'User not found' });
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await getBookingAppointment(userId);
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
