'use client';

import { ComponentType } from 'react';
import { useDisclosure } from '@heroui/react';
import dynamic from 'next/dynamic';

// Apis
import { logout } from '@/actions';

const BaseModal = dynamic(
  () => import('@/ui/components/BaseModal').then((mod) => mod.BaseModal),
  {
    ssr: false,
  },
);

export const withLogoutModal = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const RenderWithOptionsModal = (props: P) => {
    const { isOpen, onOpenChange } = useDisclosure();

    const handleConfirmLogout = () => {
      logout();
      onOpenChange();
    };

    return (
      <>
        <WrappedComponent onClick={onOpenChange} {...props} />
        <BaseModal
          isOpen={isOpen}
          title="Confirm Logout"
          subTitle="Are you sure you want to log out your account?"
          textConfirmButton="Yes, Log out Now"
          onOpenChange={onOpenChange}
          onSubmit={handleConfirmLogout}
        />
      </>
    );
  };

  return RenderWithOptionsModal;
};
