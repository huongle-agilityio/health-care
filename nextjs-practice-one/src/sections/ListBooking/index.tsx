'use client';

import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

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
import { COOKIES_KEYS } from '@/constants';

export const ListBooking = () => {
  const [bookingAppointments, setBookingAppointments] = useState<BookingSlot[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const cookies = new Cookies();
  const token = cookies.get(COOKIES_KEYS.TOKEN);

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
      const { data, error } = await getBookingAppointment(userId, token);
      setLoading(false);

      if (error) {
        return showToast({ description: error });
      }

      setBookingAppointments(data);
    };

    fetchData();
  }, [showToast, token, userId]);

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
