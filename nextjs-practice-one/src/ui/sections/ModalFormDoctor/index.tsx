'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { z } from 'zod';

// Components
import { FormDoctor } from '../FormDoctor';

// Schema
import { doctorPayload } from '@/schema';

const BaseModal = dynamic(
  () => import('@/ui/components/BaseModal').then((mod) => mod.BaseModal),
  {
    ssr: false,
  },
);

interface ModalFormDoctorProps {
  isOpen: boolean;
  isAddNew?: boolean;
  onToggleModal: () => void;
}

export const ModalFormDoctor = ({
  isOpen,
  isAddNew = true,
  onToggleModal,
}: ModalFormDoctorProps) => {
  const {
    control,
    clearErrors,
    handleSubmit: submitForm,
  } = useForm<z.infer<typeof doctorPayload>>({
    mode: 'onBlur',
    resolver: zodResolver(doctorPayload),
  });

  // TODO: handle call api create doctor
  const onSubmit = async () => {
    // const payload = {
    //   data: data,
    // };
  };

  return (
    <BaseModal
      title={isAddNew ? 'Add New Doctor' : 'Update Doctor'}
      isOpen={isOpen}
      onOpenChange={onToggleModal}
      onSubmit={submitForm(onSubmit)}
      textConfirmButton={isAddNew ? 'Add' : 'Save'}
      textCancelButton="Cancel"
    >
      <FormDoctor
        control={control}
        clearErrors={clearErrors}
        onSubmit={submitForm(onSubmit)}
      />
    </BaseModal>
  );
};
