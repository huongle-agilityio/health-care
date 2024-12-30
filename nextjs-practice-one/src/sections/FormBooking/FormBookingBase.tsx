'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { z } from 'zod';

// Apis
import { createBookingAppointment, getBookingTimeSlot } from '@/actions';

// Components
import { DoctorInfo } from './DoctorInfo';
import {
  Button,
  TimeSlotsSkeleton,
  CalendarController,
  InputController,
  SelectController,
  CheckboxController,
} from '@/components';

// Constants
import {
  ERROR_MESSAGES,
  REGEX_EMAIL,
  REGEX_PHONE_NUMBER,
  ROUTERS,
} from '@/constants';

// Stores
import { useToastStore, useUserStore } from '@/stores';

// Types
import { Doctor, BookingTimeSlots, TimeSlot } from '@/types';

// Utils
import { getStatusTimeSlots, isEmptyObject } from '@/utils';

const GENDER = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
];

const formSchema = z.object({
  time: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED }),
  name: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED }),
  date: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED }),
  gender: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED }),
  phone: z
    .string()
    .min(1, { message: ERROR_MESSAGES.REQUIRED })
    .min(11, { message: ERROR_MESSAGES.MAX_PHONE_NUMBER })
    .regex(REGEX_PHONE_NUMBER, {
      message: ERROR_MESSAGES.INVALID_PHONE,
    }),
  email: z
    .string()
    .min(1, { message: ERROR_MESSAGES.REQUIRED })
    .regex(REGEX_EMAIL, {
      message: ERROR_MESSAGES.INVALID_EMAIL,
    }),
});

interface FormBookingBaseProps {
  doctorId: string;
  doctor: Doctor;
  times: TimeSlot[];
}

export const FormBookingBase = ({
  doctorId,
  doctor,
  times,
}: FormBookingBaseProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeSlots, setTimeSlots] = useState<BookingTimeSlots[]>([]);
  const router = useRouter();

  const { user } = useUserStore();
  const { showToast } = useToastStore();
  const today = dayjs().format('YYYY-MM-DD');

  const initialState = {
    email: user?.email || '',
    name: user?.name || '',
    phone: user?.phone || '',
    time: '',
    date: today,
    gender: user?.gender || '',
  };

  const {
    control,
    clearErrors,
    reset,
    watch,
    handleSubmit: submitForm,
  } = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: initialState,
  });

  const date = watch('date');

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      data: {
        date: values.date,
        timeSlot: values.time,
        doctor: doctorId,
        user: user?.id || 0,
      },
    };

    const { data, error } = await createBookingAppointment(payload);

    if (error) {
      return showToast({ description: error });
    }

    if (data) {
      showToast({
        title: 'Success',
        description: 'Booking successful',
        variant: 'success',
      });
      router.push(ROUTERS.APPOINTMENTS);
    }
  };

  useEffect(() => {
    const fetchSpecialties = async () => {
      setIsLoading(true);
      const { data, error } = await getBookingTimeSlot(doctorId, date);
      setIsLoading(false);

      if (error) {
        return showToast({ description: error });
      }

      setTimeSlots(data);
    };

    fetchSpecialties();
  }, [date, doctorId, showToast]);

  useEffect(() => {
    if (!isEmptyObject(user)) {
      reset({
        email: user?.email || '',
        name: user?.name || '',
        phone: user?.phone || '',
        time: '',
        date: today,
        gender: user?.gender || '',
      });
    }
  }, [reset, today, user]);

  return (
    <form
      onSubmit={submitForm(handleSubmit)}
      className="p-10 xl:p-25 rounded-xl shadow-xl"
    >
      <div className="flex flex-col xl:flex-row gap-25 items-center justify-center">
        <DoctorInfo doctor={doctor} />
        <div className="flex flex-col xl:flex-row gap-10 md:gap-22 items-center">
          <CalendarController
            name="date"
            control={control}
            clearErrors={clearErrors}
          />
          <div>
            {isLoading ? (
              <TimeSlotsSkeleton />
            ) : (
              <CheckboxController
                control={control}
                name="time"
                options={getStatusTimeSlots(times, timeSlots)}
                clearErrors={clearErrors}
                className="flex flex-row xl:flex-col flex-wrap mb-10 xl:mb-0"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <InputController
          control={control}
          placeholder="Enter your name"
          label="Name"
          name="name"
          clearErrors={clearErrors}
        />
        <InputController
          control={control}
          placeholder="Enter your phone number"
          label="Phone"
          name="phone"
          type="number"
          clearErrors={clearErrors}
        />
        <InputController
          control={control}
          placeholder="Enter your email address"
          label="Email"
          name="email"
          clearErrors={clearErrors}
        />
        <SelectController
          name="gender"
          label="Gender"
          aria-label="Choice your gender"
          options={GENDER}
          placeholder="Choice your gender"
          control={control}
          clearErrors={clearErrors}
          className="pt-6"
        />

        <div className="flex flex-col mt-20 gap-15">
          <Button isLoading={isEmptyObject(user)} type="submit" color="default">
            Book Appointment
          </Button>
          <Button type="submit" color="primary">
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};
