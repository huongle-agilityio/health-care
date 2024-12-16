'use client';

import { ComponentType } from 'react';
import { useDisclosure } from '@nextui-org/react';
import dynamic from 'next/dynamic';

const ConfirmModal = dynamic(
  () => import('../sections/ConfirmModal').then((mod) => mod.ConfirmModal),
  {
    ssr: false,
  },
);

export const withLogoutModal = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const RenderWithOptionsModal = (props: P) => {
    const { isOpen, onOpenChange } = useDisclosure();
    const { ...rest } = props;

    const handleConfirmLogout = () => {
      // TODO: Handle feature logout
      onOpenChange();
    };

    return (
      <>
        <WrappedComponent onClick={onOpenChange} {...(rest as P)} />
        <ConfirmModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onSubmit={handleConfirmLogout}
        />
      </>
    );
  };

  return RenderWithOptionsModal;
};
