'use client';

import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';

// Actions
import { getSpecialties } from '@/actions';

// Components
import { Button, SelectController, SelectSkeleton } from '@/components';

// Mocks
import { EXPERIENCES, FEES, RATING } from '@/constants/mocks';

// Types
import { Specialty } from '@/types';

// Stores
import { useToastStore } from '@/stores';

// Utils
import { formatSpecialtiesOption } from '@/utils';

// interface FormData {
//   specialty: string;
//   rating: string;
//   experience: string;
//   fee: string;
// }

export const FormFilterDoctors = () => {
  const [specialties, setSpecialty] = useState<Specialty[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { showToast } = useToastStore();

  const initialState = useMemo(
    () => ({ specialty: '', rating: '1', experience: 'fresher', fee: '0' }),
    [],
  );

  const {
    control,
    clearErrors,
    reset,
    handleSubmit: submitForm,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: initialState,
  });

  const handleSubmit = useCallback(() => {
    // TODO: handle submit
  }, []);

  const handleReset = useCallback(() => {
    reset(initialState);
  }, [initialState, reset]);

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
      className="flex gap-21 justify-center items-end md:h-[96px]"
    >
      {isLoading ? (
        Array.from({ length: 4 }, (_, index) => (
          <SelectSkeleton key={`select-skeleton-${index}`} />
        ))
      ) : (
        <>
          <SelectController
            name="specialty"
            label="Specialty"
            aria-label="Choice Specialty"
            options={formatSpecialtiesOption(specialties)}
            placeholder="Specialty"
            control={control}
            clearErrors={clearErrors}
            classNames={{
              mainWrapper: 'w-[197px]',
              base: 'w-[197px]',
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
              mainWrapper: 'w-[148px]',
              base: 'w-[148px]',
            }}
          />

          <SelectController
            name="experience"
            label="Experience"
            aria-label="Choice Experience"
            options={EXPERIENCES}
            control={control}
            placeholder="Experience"
            clearErrors={clearErrors}
            classNames={{
              mainWrapper: 'w-[215px]',
              base: 'w-[215px]',
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
              mainWrapper: 'w-[160px]',
              base: 'w-[160px]',
            }}
          />
        </>
      )}

      <Button type="submit" isLoading={isLoading}>
        Search
      </Button>
      <Button color="primary" onClick={handleReset} isLoading={isLoading}>
        Reset
      </Button>
    </form>
  );
};
