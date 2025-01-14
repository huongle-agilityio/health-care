'use client';

import { useForm } from 'react-hook-form';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';

// Actions
import { getSpecialties } from '@/actions';

// Components
import { SkeletonFilter } from './FilterSkeleton';
import { Button, SelectController } from '@/ui/components';

// Mocks
import { WORK_EXPERIENCE_YEARS, FEES, RATING } from '@/constants/mocks';

// Types
import { Specialty } from '@/types';

// Contexts
import { ToastContext } from '@/contexts';

// Utils
import { cn, formatSpecialtiesOption } from '@/utils';

interface FormData {
  specialty?: string;
  rating?: number;
  experience?: string;
  fee?: number;
}

export const FormFilterDoctors = ({
  specialty,
  rating,
  experience,
  fee,
}: FormData) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [specialties, setSpecialty] = useState<Specialty[]>([]);

  const { showToast } = useContext(ToastContext);
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const initialState = {
    specialty,
    rating,
    experience,
    fee,
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
  const formatExperience = Object.entries(WORK_EXPERIENCE_YEARS).map(
    ([key, [start, end]]) => ({
      value: key,
      label: `${start}-${end} Years`,
    }),
  );

  /**
   * Function to handle form submit
   */
  const handleSubmit = (data: FormData) => {
    (Object.keys(data) as (keyof FormData)[]).forEach((key) => {
      const value = data[key];
      if (value) {
        params.set(key, value.toString());
      }
    });
    replace(`${pathname}?${params.toString()}`);
  };

  /**
   * Function to reset form and url
   */
  const handleReset = useCallback(() => {
    reset({
      specialty: '',
      rating: 0,
      experience: '',
      fee: 0,
    });

    if (params.size) replace(pathname);
  }, [params, pathname, replace, reset]);

  // Fetch specialties
  useEffect(() => {
    const fetchSpecialties = async () => {
      const { data, error } = await getSpecialties();

      startTransition(() => {
        if (error) {
          return showToast({ description: error });
        }

        setSpecialty(data);
      });
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
      {isPending ? (
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
              options={formatExperience}
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
        <Button type="submit" isDisabled={!isDirty} isLoading={isPending}>
          Search
        </Button>
        <Button
          color="primary"
          isDisabled={isDisabledButtonReset}
          onPress={handleReset}
          isLoading={isPending}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};
