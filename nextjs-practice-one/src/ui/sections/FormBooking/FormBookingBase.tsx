'use client';

import {
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Apis
import { createBookingAppointment, getBookingTimeSlotById } from '@/actions';

// Components
import { DoctorInfo } from './DoctorInfo';
import {
  Button,
  TimeSlotsSkeleton,
  CalendarController,
  InputController,
  CheckboxController,
} from '@/ui/components';

// Constants
import { ROUTES } from '@/constants';

// Contexts
import { ToastContext } from '@/contexts';

// Schema
import { bookingSchema } from '@/schema';

// Types
import { Doctor, BookingTimeSlots, TimeSlot, UserSession } from '@/types';

// Utils
import { cn, getStatusTimeSlots, todayWithFormat } from '@/utils';

interface FormBookingBaseProps {
  doctorId: string;
  doctor: Doctor;
  times: TimeSlot[];
  userInfo?: UserSession;
}

export const FormBookingBase = ({
  doctorId,
  doctor,
  userInfo,
  times,
}: FormBookingBaseProps) => {
  const [isPending, startTransition] = useTransition();
  const [timeSlots, setTimeSlots] = useState<BookingTimeSlots[]>([]);
  const { name, specialty, experience, rating, avatar } = doctor;

  const router = useRouter();

  const { showToast } = useContext(ToastContext);
  const { email, name: userName, phone, id = '' } = userInfo || {};

  const initialState = {
    email,
    name: userName,
    phone,
    time: '',
    date: todayWithFormat(),
  };

  const {
    control,
    clearErrors,
    watch,
    reset,
    handleSubmit: submitForm,
  } = useForm<z.infer<typeof bookingSchema>>({
    mode: 'onChange',
    resolver: zodResolver(bookingSchema),
    defaultValues: initialState,
  });

  const date = watch('date');

  // Function submit form
  const handleSubmit = async (values: z.infer<typeof bookingSchema>) => {
    const payload = {
      data: {
        date: values.date,
        timeSlot: values.time,
        doctor: doctorId,
        user: id,
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
      router.push(ROUTES.APPOINTMENTS);
    }
  };

  // Function reset form
  const handleReset = useCallback(() => {
    reset({
      email: '',
      name: '',
      phone: '',
      time: '',
      date: todayWithFormat(),
    });
  }, [reset]);

  // Function fetch time slots
  useEffect(() => {
    const fetchSpecialties = async () => {
      const { data, error } = await getBookingTimeSlotById(doctorId, date);

      startTransition(() => {
        if (error) {
          return showToast({ description: error });
        }

        setTimeSlots(data);
      });
    };

    fetchSpecialties();
  }, [date, doctorId, showToast]);

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
            {isPending ? (
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
          maxLength={10}
          type="tel"
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
          <Button isLoading={isPending} type="submit" color="default">
            Book Appointment
          </Button>
          <Button color="primary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};
