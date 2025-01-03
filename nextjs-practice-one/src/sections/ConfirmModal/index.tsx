'use client';

import { memo } from 'react';
import {
  Modal as ModalNextUI,
  ModalContent,
  ModalBody,
  ModalFooter,
  extendVariants,
} from '@nextui-org/react';

// Components
import { Button, Text } from '@/components';

// Icons
import { CloseIcon } from '@/icons';

const ModalBase = extendVariants(ModalNextUI, {
  variants: {
    color: {
      default: {
        base: 'mx-17 py-20 md:max-w-[400px]',
        closeButton: 'mr-6 mt-6',
      },
    },
  },
  defaultVariants: {
    placement: 'center',
    color: 'default',
  },
});

export interface ConfirmModalProps {
  title?: string;
  subTitle?: string;
  textCancelButton?: string;
  textConfirmButton?: string;
  isOpen: boolean;
  onSubmit: () => void;
  onOpenChange: () => void;
}

export const ConfirmModal = memo(
  ({
    title = 'Confirm Logout',
    subTitle = 'Are you sure you want to log out your account?',
    textConfirmButton = 'Yes, Log out Now',
    textCancelButton = 'Cancel',
    isOpen,
    onSubmit,
    onOpenChange,
  }: ConfirmModalProps) => (
    <ModalBase
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      closeButton={<CloseIcon size="16" />}
    >
      <ModalContent>
        {(onClose) => (
          <div className="px-8">
            <ModalBody className="pb-17">
              <Text color="tertiary" size="2xl" className="text-center">
                {title}
              </Text>
              <Text size="xs" color="holder" className="pt-4">
                {subTitle}
              </Text>
            </ModalBody>
            <ModalFooter className="flex flex-col gap-8">
              <Button
                size="xs"
                variant="bordered"
                color="bordered"
                onPress={onSubmit}
              >
                {textConfirmButton}
              </Button>

              <Button size="xs" onPress={onClose}>
                {textCancelButton}
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </ModalBase>
  ),
);

ConfirmModal.displayName = 'ConfirmModal';
