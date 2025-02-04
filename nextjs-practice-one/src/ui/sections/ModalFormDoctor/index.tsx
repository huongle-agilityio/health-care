'use client';

import { useContext, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { z } from 'zod';

// Apis
import { createOrUpdateDoctor } from '@/actions';

// Components
import { FormDoctor } from '../FormDoctor';

// Contexts
import { ToastContext } from '@/contexts';

// Schema
import { doctorPayload } from '@/schema';

// Types
import { Specialty } from '@/types';

const BaseModal = dynamic(
  () => import('@/ui/components/BaseModal').then((mod) => mod.BaseModal),
  {
    ssr: false,
  },
);

interface ModalFormDoctorProps {
  isOpen: boolean;
  isAddNew?: boolean;
  specialties: Specialty[];
  onToggleModal: () => void;
}

export const ModalFormDoctor = ({
  isOpen,
  isAddNew = true,
  specialties,
  onToggleModal,
}: ModalFormDoctorProps) => {
  const { showToast } = useContext(ToastContext);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    clearErrors,
    handleSubmit: submitForm,
  } = useForm<z.infer<typeof doctorPayload>>({
    mode: 'onBlur',
    resolver: zodResolver(doctorPayload),
  });

  const onSubmit = (data: z.infer<typeof doctorPayload>) => {
    const payload = {
      data: data,
    };

    startTransition(async () => {
      const { data: doctor, error } = await createOrUpdateDoctor(payload);

      if (error) {
        return showToast({ description: error });
      }

      if (doctor) {
        showToast({
          title: 'Success',
          description: `${isAddNew ? 'Add' : 'Update'} doctor ${doctor.name} successfully`,
          variant: 'success',
        });
      }

      if (!error) {
        onToggleModal();
      }
    });
  };

  return (
    <BaseModal
      title={isAddNew ? 'Add New Doctor' : 'Update Doctor'}
      isOpen={isOpen}
      onOpenChange={onToggleModal}
      isLoading={isPending}
      onSubmit={submitForm(onSubmit)}
      textConfirmButton={isAddNew ? 'Add' : 'Save'}
      textCancelButton="Cancel"
    >
      <FormDoctor
        control={control}
        specialties={specialties}
        clearErrors={clearErrors}
        onSubmit={submitForm(onSubmit)}
      />
    </BaseModal>
  );
};
