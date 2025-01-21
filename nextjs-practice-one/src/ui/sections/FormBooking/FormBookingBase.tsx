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
import {
  createBookingAppointment,
  getBookingTimeSlotByDoctorId,
} from '@/actions';

// Components
import { DoctorInfo } from './DoctorInfo';
import {
  Button,
  TimeSlotsSkeleton,
  CalendarController,
  InputController,
  CheckboxController,
  SelectController,
} from '@/ui/components';

// Constants
import { BOOKING_REASONS, ROUTES } from '@/constants';

// Contexts
import { ToastContext } from '@/contexts';

// Schema
import { bookingSchema } from '@/schema';

// Types
import { Doctor, BookingTimeSlots, TimeSlot, UserSession } from '@/types';

// Utils
import { cn, formatBookingTimeSlotsWithStatus, todayWithFormat } from '@/utils';

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
    reason: '',
    date: todayWithFormat(),
  };

  const {
    control,
    clearErrors,
    watch,
    setValue,
    reset,
    handleSubmit: submitForm,
  } = useForm<z.infer<typeof bookingSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(bookingSchema),
    defaultValues: initialState,
  });

  const date = watch('date');

  /**
   * Handles form submission for booking.
   * @param {z.infer<typeof bookingSchema>} values - The form data conforming to the booking schema.
   */
  const handleSubmit = (values: z.infer<typeof bookingSchema>) => {
    startTransition(async () => {
      const payload = {
        data: {
          date: values.date,
          timeSlot: values.time,
          doctor: doctorId,
          reason: values.reason,
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
    });
  };

  const handleResetTimeSlot = useCallback(() => {
    setValue('time', '');
  }, [setValue]);

  const handleReset = useCallback(() => {
    reset({
      email: '',
      name: '',
      phone: '',
      time: '',
      reason: '',
      date: todayWithFormat(),
    });
  }, [reset]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      const { data, error } = await getBookingTimeSlotByDoctorId(
        doctorId,
        date,
      );

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
            onClick={handleResetTimeSlot}
            clearErrors={clearErrors}
          />
          <div className="h-[150px] xl:h-fit flex items-center xl:self-start px-8 xl:px-0 w-full">
            {isPending ? (
              <TimeSlotsSkeleton />
            ) : (
              <CheckboxController
                control={control}
                name="time"
                options={formatBookingTimeSlotsWithStatus(times, timeSlots)}
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

        <SelectController
          name="reason"
          label="What's your reason for booking?"
          aria-label="Choice reason booking"
          options={BOOKING_REASONS}
          placeholder="Choice your reason"
          control={control}
          clearErrors={clearErrors}
          classNames={{
            mainWrapper: 'mt-8',
          }}
        />
        <div className="flex flex-col xl:flex-row mt-20 gap-15">
          <Button
            isLoading={isPending}
            type="submit"
            color="default"
            className="w-full"
          >
            Book Appointment
          </Button>
          <Button
            color="primary"
            isLoading={isPending}
            onPress={handleReset}
            className="w-full"
          >
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
};
