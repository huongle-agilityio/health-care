'use client';

import { useForm } from 'react-hook-form';
import { useCallback, useMemo } from 'react';

// Components
import { Button, SelectController } from '@/components';

// Mocks
import { EXPERIENCES, FEES, RATING } from '@/constants/mocks';

// interface FormData {
//   specialty: string;
//   rating: string;
//   experience: string;
//   fee: string;
// }

export const FormFilterDoctors = () => {
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

  return (
    <form
      onSubmit={submitForm(handleSubmit)}
      className="flex gap-21 justify-center items-end"
    >
      <SelectController
        name="specialty"
        label="Specialty"
        aria-label="Choice Specialty"
        options={[]}
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

      <Button type="submit">Search</Button>
      <Button color="primary" onClick={handleReset}>
        Reset
      </Button>
    </form>
  );
};
