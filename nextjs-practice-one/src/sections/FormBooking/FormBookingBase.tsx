'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import dayjs from 'dayjs';

// Apis
import { getTimeDoctorSlot } from '@/actions';

// Components
import { DoctorInfo } from './DoctorInfo';
import {
  Button,
  CalendarController,
  InputController,
  SelectController,
  CheckboxController,
} from '@/components';

// Constants
import { ERROR_MESSAGES, REGEX_EMAIL, REGEX_PHONE_NUMBER } from '@/constants';

// Stores
import { useToastStore } from '@/stores';

// Types
import { Doctor, DoctorTimeSlots } from '@/types';

// Utils
import { cn, getStatusTimeSlots } from '@/utils';

const GENDER = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
];

const FormSchema = z.object({
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
}

export const FormBookingBase = ({ doctorId, doctor }: FormBookingBaseProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeSlots, setTimeSlots] = useState<DoctorTimeSlots[]>([]);

  const { showToast } = useToastStore();
  const today = useMemo(() => dayjs().format('YYYY-MM-DD'), []);

  const initialState = useMemo(
    () => ({
      email: '',
      password: '',
      name: '',
      phone: '',
      time: '',
      date: today,
      gender: '',
    }),
    [today],
  );

  const {
    control,
    clearErrors,
    watch,
    handleSubmit: submitForm,
  } = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: initialState,
  });

  const date = watch('date');

  const handleSubmit = () => {
    // console.log('data', data);
  };

  useEffect(() => {
    const fetchSpecialties = async () => {
      setIsLoading(true);
      const { data, error } = await getTimeDoctorSlot(doctorId, date);
      setIsLoading(false);

      if (error) {
        return showToast({ description: error });
      }

      setTimeSlots(data);
    };

    fetchSpecialties();
  }, [date, doctorId, showToast]);

  return (
    <form
      onSubmit={submitForm(handleSubmit)}
      className="p-25 rounded-xl shadow-xl"
    >
      <div className="flex gap-25 items-center justify-center">
        <Suspense fallback={<Skeleton />}>
          <DoctorInfo doctor={doctor} />
        </Suspense>
        <div className="flex gap-22">
          <CalendarController
            name="date"
            control={control}
            clearErrors={clearErrors}
          />
          <div>
            {isLoading ? (
              <div className="flex flex-col gap-6">
                <Skeleton className={cn('rounded-xl', 'w-[110px] h-[20px]')}>
                  <div className="bg-default-300" />
                </Skeleton>
                <Skeleton className={cn('rounded-xl', 'w-[110px] h-[20px]')}>
                  <div className="bg-default-300" />
                </Skeleton>
                <Skeleton className={cn('rounded-xl', 'w-[110px] h-[20px]')}>
                  <div className="bg-default-300" />
                </Skeleton>
              </div>
            ) : (
              <CheckboxController
                control={control}
                name="time"
                options={getStatusTimeSlots(timeSlots) || []}
                clearErrors={clearErrors}
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
          <Button type="submit" color="default">
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
