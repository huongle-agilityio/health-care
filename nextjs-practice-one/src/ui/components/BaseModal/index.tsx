'use client';

import { memo, ReactNode } from 'react';
import {
  Modal as ModalNextUI,
  ModalContent,
  ModalBody,
  ModalFooter,
  extendVariants,
} from '@heroui/react';

// Components
import { Button, Text } from '@/ui/components';

// Icons
import { CloseIcon } from '@/ui/icons';

// Utils
import { cn } from '@/utils';

const ModalBase = extendVariants(ModalNextUI, {
  variants: {
    color: {
      default: {
        base: 'py-15 md:py-20 md:max-w-[500px] max-h-[90vh]',
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
  isOpen: boolean;
  title: string;
  subTitle?: string;
  textConfirmButton?: string;
  textCancelButton?: string;
  classNameFooter?: string;
  classNameContent?: string;
  isLoading?: boolean;
  children?: ReactNode;
  onSubmit: () => void;
  onOpenChange: () => void;
}

export const BaseModal = memo(
  ({
    isOpen,
    subTitle,
    title,
    textConfirmButton,
    textCancelButton = 'Cancel',
    classNameFooter,
    classNameContent,
    onSubmit,
    isLoading,
    onOpenChange,
    children,
  }: ConfirmModalProps) => (
    <ModalBase
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      closeButton={<CloseIcon size="16" />}
    >
      <ModalContent className={cn(classNameContent)}>
        {(onClose) => (
          <div className="px-5 md:px-8 overflow-auto">
            <ModalBody className="pb-17">
              <Text color="tertiary" size="2xl" className="text-center">
                {title}
              </Text>
              <Text size="xs" color="holder" className="pt-4">
                {subTitle}
              </Text>
              {children}
            </ModalBody>
            <ModalFooter
              className={cn('flex gap-8', 'flex-col', classNameFooter)}
            >
              <Button isLoading={isLoading} size="xs" onPress={onSubmit}>
                {textConfirmButton}
              </Button>

              <Button
                isDisabled={isLoading}
                size="xs"
                variant="bordered"
                color="bordered"
                onPress={onClose}
              >
                {textCancelButton}
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </ModalBase>
  ),
);

BaseModal.displayName = 'BaseModal';
