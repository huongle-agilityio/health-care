'use client';

import { ComponentType, ReactNode, Suspense } from 'react';
import { useDisclosure } from '@nextui-org/react';
import dynamic from 'next/dynamic';

const ConfirmModal = dynamic(
  () => import('../sections/ConfirmModal').then((mod) => mod.ConfirmModal),
  {
    ssr: false,
  },
);

type Props<P> = P & {
  loadingFallback?: ReactNode;
};

export const withLogoutModal = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const RenderWithOptionsModal = (props: Props<P>) => {
    const { isOpen, onOpenChange } = useDisclosure();
    const { loadingFallback, ...rest } = props;

    const handleConfirmLogout = () => {
      // TODO: Handle feature logout
      onOpenChange();
    };

    return (
      <Suspense fallback={loadingFallback ?? null}>
        <WrappedComponent onClick={onOpenChange} {...(rest as P)} />
        <ConfirmModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onSubmit={handleConfirmLogout}
        />
      </Suspense>
    );
  };

  return RenderWithOptionsModal;
};
