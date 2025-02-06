'use client';

import { useContext, useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { z } from 'zod';

// Apis
import { createOrUpdateDoctor, getDoctorById } from '@/actions';

// Components
import { FormDoctor } from '../FormDoctor';

// Constants
import { IMAGES } from '@/constants';

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
  doctorId?: string;
  isAddNew?: boolean;
  specialties: Specialty[];
  onToggleModal: () => void;
}

export const ModalFormDoctor = ({
  isOpen,
  doctorId,
  isAddNew = true,
  specialties,
  onToggleModal,
}: ModalFormDoctorProps) => {
  const { showToast } = useContext(ToastContext);
  const [preview, setPreview] = useState<string>(IMAGES.FALLBACK_URL);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    clearErrors,
    reset,
    handleSubmit: submitForm,
    formState: { isDirty },
  } = useForm<z.infer<typeof doctorPayload>>({
    mode: 'onBlur',
    resolver: zodResolver(doctorPayload),
  });

  const onSubmit = (data: z.infer<typeof doctorPayload>) => {
    startTransition(async () => {
      const { data: doctor, error } = await createOrUpdateDoctor(
        data,
        doctorId,
      );

      if (error) {
        return showToast({ description: error });
      }

      showToast({
        title: 'Success',
        description: `${isAddNew ? 'Add' : 'Update'} doctor ${doctor.name} successfully`,
        variant: 'success',
      });
      onToggleModal();
    });
  };

  useEffect(() => {
    if (doctorId) {
      startTransition(() => {
        const fetchDoctorById = async () => {
          const { data, error } = await getDoctorById(doctorId);

          if (error) {
            return showToast({ description: error });
          }

          reset({
            name: data.name,
            specialty: data.specialty?.documentId,
            experience: data.experience,
            rating: data.rating,
            avatar: data.avatar,
            fee: data.fee,
          });
          setPreview(data.avatar);
        };

        fetchDoctorById();
      });
    }
  }, [doctorId, reset, showToast]);

  return (
    <BaseModal
      title={isAddNew ? 'Add New Doctor' : 'Update Doctor'}
      isOpen={isOpen}
      onOpenChange={onToggleModal}
      isLoading={isPending}
      onSubmit={submitForm(onSubmit)}
      isDisabledSubmitButton={!isDirty}
      textConfirmButton={isAddNew ? 'Add' : 'Save'}
      textCancelButton="Cancel"
    >
      <FormDoctor
        control={control}
        specialties={specialties}
        clearErrors={clearErrors}
        preview={preview}
        onPreview={setPreview}
        onSubmit={submitForm(onSubmit)}
      />
    </BaseModal>
  );
};
