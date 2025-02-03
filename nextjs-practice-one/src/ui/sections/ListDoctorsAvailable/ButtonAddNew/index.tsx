'use client';

import { useDisclosure } from '@heroui/react';

// Components
import { Button } from '@/ui/components';
import { ModalFormDoctor } from '../../ModalFormDoctor';

// Types
import { Specialty } from '@/types';

interface ButtonAddNewProps {
  shouldShowButton: boolean;
  specialties: Specialty[];
}

export const ButtonAddNew = ({
  shouldShowButton,
  specialties,
}: ButtonAddNewProps) => {
  const { isOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {shouldShowButton && (
        <div className="w-full flex justify-center lg:justify-end pb-7">
          <Button onClick={onOpenChange}>Add New Doctor</Button>
        </div>
      )}

      {isOpen && (
        <ModalFormDoctor
          isOpen={isOpen}
          specialties={specialties}
          onToggleModal={onOpenChange}
        />
      )}
    </>
  );
};
