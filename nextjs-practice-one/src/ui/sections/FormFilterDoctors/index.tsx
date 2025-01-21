'use client';

import { useForm } from 'react-hook-form';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

// Components
import { Button, SelectController } from '@/ui/components';

// Mocks
import { FEES, RATING, OPTION_ALL } from '@/constants/mocks';

// Types
import { Specialty } from '@/types';

// Utils
import { cn, formatSpecialtiesOption, formatWorkingExperience } from '@/utils';

interface FormData {
  specialty?: string;
  rating?: number;
  experience?: string;
  fee?: number;
  listSpecialties?: Specialty[];
}

export const FormFilterDoctors = ({
  specialty,
  listSpecialties = [],
  rating,
  experience,
  fee,
}: FormData) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const initialState = {
    specialty,
    rating: rating || 0,
    experience,
    fee: fee || 0,
  };

  const {
    control,
    clearErrors,
    reset,
    formState: { isDirty },
    handleSubmit: submitForm,
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: initialState,
  });

  const isDisabledButtonReset = !(isDirty || params.size);

  const workingExperienceOptions = [OPTION_ALL, ...formatWorkingExperience];
  const specialtyOptions = [
    OPTION_ALL,
    ...formatSpecialtiesOption(listSpecialties),
  ];

  /**
   * Handles form submission for the filter form.
   * @param {FormData} data - The form data to update the URL with.
   */
  const handleSubmit = (data: FormData) => {
    // Update the URL with the new search parameters
    Object.entries(data).forEach(([key, value]) =>
      value && value !== '0'
        ? params.set(key, value.toString())
        : params.delete(key),
    );

    // Replace the current URL with the new URL
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleReset = useCallback(() => {
    reset({
      specialty: '',
      rating: 0,
      experience: '',
      fee: 0,
    });

    // Remove all search parameters
    if (params.size) replace(pathname);
  }, [params, pathname, replace, reset]);

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
      <div className="flex flex-row gap-8 2xl:gap-21 w-full 2xl:w-fit">
        <div className="flex flex-col 2xl:flex-row gap-14 2xl:gap-21 w-full">
          <SelectController
            name="specialty"
            label="Specialty"
            aria-label="Choice Specialty"
            placeholder="Choice Specialty"
            options={specialtyOptions}
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
            placeholder="Choice Rating"
            options={RATING}
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
            placeholder="Choice Experience"
            options={workingExperienceOptions}
            control={control}
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
            placeholder="Choice Fee"
            options={FEES}
            control={control}
            clearErrors={clearErrors}
            classNames={{
              mainWrapper: '2xl:w-[160px]',
              base: '2xl:w-[160px]',
            }}
          />
        </div>
      </div>
      <div className="flex flex-col 2xl:flex-row gap-8 2xl:gap-21 w-full 2xl:w-fit">
        <Button type="submit" isDisabled={!isDirty}>
          Search
        </Button>
        <Button
          color="primary"
          isDisabled={isDisabledButtonReset}
          onPress={handleReset}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};
