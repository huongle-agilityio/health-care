'use client';

import { memo, useCallback, useContext, useState } from 'react';
import { useDisclosure } from '@heroui/react';

// Apis
import { deleteDoctor } from '@/actions';

// Components
import { ModalFormDoctor } from '../ModalFormDoctor';
import { BaseModal, DoctorCard } from '@/ui/components';

// Constants
import { ROUTES } from '@/constants';

// Contexts
import { ToastContext } from '@/contexts';

// Types
import { Doctor, Specialty } from '@/types';

interface ListDoctors {
  isAdmin: boolean;
  doctors: Doctor[];
  specialties: Specialty[];
}

export const ListDoctors = memo(
  ({ isAdmin, doctors, specialties }: ListDoctors) => {
    const [doctorId, setDoctorId] = useState<string>('');
    const {
      isOpen: isOpenConfirmModal,
      onOpenChange: onOpenChangeConfirmModal,
    } = useDisclosure();
    const { isOpen, onOpenChange } = useDisclosure();
    const { showToast } = useContext(ToastContext);

    const handleOpenEditModal = useCallback(
      (id: string) => {
        setDoctorId(id);
        onOpenChange();
      },
      [onOpenChange],
    );

    const handleOpenDeleteModal = useCallback(
      (id: string) => {
        setDoctorId(id);
        onOpenChangeConfirmModal();
      },
      [onOpenChangeConfirmModal],
    );

    const handleConfirmDelete = useCallback(async () => {
      const { error } = await deleteDoctor(doctorId);

      if (error) {
        return showToast({ description: error });
      }
      onOpenChangeConfirmModal();
    }, [doctorId, onOpenChangeConfirmModal, showToast]);

    return (
      <>
        <div className="flex flex-wrap gap-x-8 gap-y-20 w-full justify-center lg:justify-start">
          {doctors.map(
            ({
              id,
              documentId = '',
              experience,
              avatar,
              name,
              rating,
              specialty,
            }) => (
              <DoctorCard
                id={documentId}
                key={`doctor-${id}`}
                experience={experience}
                imageSrc={avatar}
                name={name}
                hasPermission={isAdmin}
                href={ROUTES.BOOKING_APPOINTMENTS_DETAIL(documentId)}
                rating={rating}
                specialty={specialty?.name || ''}
                onOpenEditModal={handleOpenEditModal}
                onOpenDeleteModal={handleOpenDeleteModal}
              />
            ),
          )}
        </div>

        {isOpen && (
          <ModalFormDoctor
            isOpen={isOpen}
            isAddNew={false}
            doctorId={doctorId}
            specialties={specialties}
            onToggleModal={onOpenChange}
          />
        )}

        {isOpenConfirmModal && (
          <BaseModal
            isOpen={isOpenConfirmModal}
            title="Confirm Delete"
            subTitle="Are you sure you want to delete this doctor?"
            textConfirmButton="Delete"
            onSubmit={handleConfirmDelete}
            onOpenChange={onOpenChangeConfirmModal}
          />
        )}
      </>
    );
  },
);

ListDoctors.displayName = 'ListDoctors';
