'use client';

import { ComponentType } from 'react';
import { useDisclosure } from '@nextui-org/react';
import dynamic from 'next/dynamic';

// Apis
import { logout } from '@/actions';

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

    // Function logout
    const handleConfirmLogout = () => {
      logout();
      onOpenChange();
    };

    return (
      <>
        <WrappedComponent onClick={onOpenChange} {...props} />
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
