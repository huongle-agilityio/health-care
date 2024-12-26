'use client';

import { ComponentType } from 'react';
import { useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Constants
import { ROUTERS } from '@/constants';

// Stores
import { useUserStore } from '@/stores';

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
    const router = useRouter();
    const { logout } = useUserStore();
    const { isOpen, onOpenChange } = useDisclosure();
    const { ...rest } = props;

    const handleConfirmLogout = () => {
      logout();
      router.push(ROUTERS.LOGIN);
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
