'use client';

import { useState } from 'react';
import { Control, UseFormClearErrors } from 'react-hook-form';
import { z } from 'zod';

// Constants
import { IMAGES } from '@/constants';
import { RATING } from '@/constants/mocks';

// Components
import {
  Image,
  InputController,
  SelectController,
  InputFileController,
} from '@/ui/components';

// Schema
import { doctorPayload } from '@/schema';

// Types
import { Specialty } from '@/types';

// Utils
import { cn } from '@/utils';

interface FormDoctorProps {
  specialties: Specialty[];
  control: Control<z.infer<typeof doctorPayload>>;
  clearErrors: UseFormClearErrors<z.infer<typeof doctorPayload>>;
  onSubmit: () => void;
}

export const FormDoctor = ({
  control,
  specialties,
  clearErrors,
  onSubmit,
}: FormDoctorProps) => {
  const commonProps = { control, clearErrors };
  const [preview, setPreview] = useState<string>(IMAGES.FALLBACK_URL);
  const formatSpecialtiesOption = specialties.map(
    ({ name, documentId = '' }) => ({
      value: documentId,
      label: name,
    }),
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col justify-between items-center md:flex-row mb-10">
        <Image
          src={preview}
          alt="Preview avatar"
          sizes="(max-width: 768px) 100px, 150px"
          classNameWrapper={cn(
            'rounded-full mt-10 md:mt-0',
            'w-[100px] h-[100px]',
            'md:w-[150px] md:h-[150px]',
          )}
        />
        <div className="w-full md:max-w-[60%]">
          <InputFileController
            label="Avatar"
            name="avatar"
            placeholder="Choice your avatar"
            onChangePreview={setPreview}
            {...commonProps}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <InputController
          placeholder="Enter doctor's name"
          label="Name"
          name="name"
          {...commonProps}
        />
        <InputController
          placeholder="Enter doctor's fee"
          type="number"
          label="Fee"
          name="fee"
          {...commonProps}
        />
        <SelectController
          name="rating"
          label="Rating"
          aria-label="Choice doctor's rating"
          options={RATING.slice(-5)}
          placeholder="Choice doctor's rating"
          classNames={{
            mainWrapper: 'mt-8',
          }}
          {...commonProps}
        />
        <InputController
          placeholder="Enter doctor's experience"
          label="Work experience"
          type="number"
          name="experience"
          {...commonProps}
        />
        <SelectController
          name="specialty"
          label="Specialty"
          aria-label="Choice doctor's specialty"
          options={formatSpecialtiesOption}
          placeholder="Choice doctor's specialty"
          classNames={{
            mainWrapper: 'mt-8',
          }}
          {...commonProps}
        />
      </div>
    </form>
  );
};
