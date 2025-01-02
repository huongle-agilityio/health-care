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
import { cn, getStatusTimeSlots, isEmptyObject } from '@/utils';

const formSchema = z.object({
  time: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED }),
  name: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED }),
  date: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED }),
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
  const { name, specialty, experience, rating, avatar } = doctor;

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

  // Function submit form
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

  // Function fetch time slots
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

  // Function set default values when user have values
  useEffect(() => {
    if (!isEmptyObject(user)) {
      reset({
        email: '',
        name: '',
        phone: '',
        time: '',
        date: today,
      });
    }
  }, [reset, today, user]);

  return (
    <form
      onSubmit={submitForm(handleSubmit)}
      className="p-10 xl:p-25 rounded-xl shadow-xl"
    >
      <div className="flex flex-col xl:flex-row gap-10 xl:gap-25 items-center justify-center">
        <DoctorInfo
          name={name}
          specialty={specialty}
          experience={experience}
          rating={rating}
          avatar={avatar}
        />
        <div
          className={cn(
            'flex flex-col xl:flex-row gap-10 xl:gap-22 items-center',
          )}
        >
          <CalendarController
            name="date"
            control={control}
            clearErrors={clearErrors}
          />
          <div className="h-[150px] xl:h-fit flex items-center xl:self-start px-8 xl:px-0 w-full">
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
