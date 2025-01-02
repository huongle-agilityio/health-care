'use client';

import { useForm } from 'react-hook-form';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

// Actions
import { getSpecialties } from '@/actions';

// Components
import { SkeletonFilter } from './FilterSkeleton';
import { Button, SelectController } from '@/components';

// Mocks
import { EXPERIENCES, FEES, RATING } from '@/constants/mocks';

// Types
import { DoctorFilterParams, Specialty } from '@/types';

// Stores
import { useToastStore } from '@/stores';

// Utils
import { cn, formatSpecialtiesOption } from '@/utils';

export const FormFilterDoctors = ({
  specialty,
  rating,
  experience,
  fee,
}: DoctorFilterParams) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [specialties, setSpecialty] = useState<Specialty[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { showToast } = useToastStore();
  const params = new URLSearchParams(searchParams.toString());

  const initialState = useMemo(
    () => ({
      specialty: specialty,
      rating: rating,
      experience: experience,
      fee: fee,
    }),
    [experience, fee, rating, specialty],
  );

  const {
    control,
    clearErrors,
    reset,
    handleSubmit: submitForm,
  } = useForm<DoctorFilterParams>({
    mode: 'onSubmit',
    defaultValues: initialState,
  });

  /**
   * Function to handle form submit
   */
  const handleSubmit = (data: DoctorFilterParams) => {
    (Object.keys(data) as (keyof DoctorFilterParams)[]).forEach((key) => {
      const value = data[key];
      if (value !== undefined) {
        params.set(key, value.toString());
      }
    });
    replace(`${pathname}?${params.toString()}`);
  };

  /**
   * Function to reset form and url
   */
  const handleReset = useCallback(() => {
    reset();
    replace(pathname);
  }, [pathname, replace, reset]);

  // Fetch specialties
  useEffect(() => {
    const fetchSpecialties = async () => {
      setIsLoading(true);
      const { data, error } = await getSpecialties();
      setIsLoading(false);

      if (error) {
        return showToast({ description: error });
      }

      setSpecialty(data);
    };

    fetchSpecialties();
  }, [showToast]);

  return (
    <form
      onSubmit={submitForm(handleSubmit)}
      className={cn(
        'flex gap-10 2xl:gap-21 flex-col 2xl:flex-row',
        'justify-start 2xl:justify-center',
        'items-start 2xl:items-end',
        'h-fit 2xl:h-[96px]',
      )}
    >
      {isLoading ? (
        <SkeletonFilter />
      ) : (
        <div className="flex flex-row gap-8 2xl:gap-21 w-full 2xl:w-fit">
          <div className="flex flex-col 2xl:flex-row gap-14 2xl:gap-21 w-full">
            <SelectController
              name="specialty"
              label="Specialty"
              aria-label="Choice Specialty"
              options={formatSpecialtiesOption(specialties)}
              placeholder="Specialty"
              control={control}
              clearErrors={clearErrors}
              classNames={{
                mainWrapper: '2xl:w-[197px]',
                base: '2xl:w-[197px]',
              }}
            />

            <SelectController
              name="rating"
              label="Rating"
              aria-label="Choice Rating"
              options={RATING}
              placeholder="Rating"
              control={control}
              clearErrors={clearErrors}
              classNames={{
                mainWrapper: '2xl:w-[148px]',
                base: '2xl:w-[148px]',
              }}
            />
          </div>

          <div className="flex flex-col 2xl:flex-row gap-14 2xl:gap-21 w-full">
            <SelectController
              name="experience"
              label="Experience"
              aria-label="Choice Experience"
              options={EXPERIENCES}
              control={control}
              placeholder="Experience"
              clearErrors={clearErrors}
              classNames={{
                mainWrapper: '2xl:w-[215px]',
                base: '2xl:w-[215px]',
              }}
            />

            <SelectController
              name="fee"
              label="Booking Fee"
              aria-label="Choice Fee"
              options={FEES}
              control={control}
              placeholder="Fee"
              clearErrors={clearErrors}
              classNames={{
                mainWrapper: '2xl:w-[160px]',
                base: '2xl:w-[160px]',
              }}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col 2xl:flex-row gap-8 2xl:gap-21 w-full 2xl:w-fit">
        <Button type="submit" isLoading={isLoading}>
          Search
        </Button>
        <Button color="primary" onClick={handleReset} isLoading={isLoading}>
          Reset
        </Button>
      </div>
    </form>
  );
};
