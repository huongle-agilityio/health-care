'use client';

import { useContext } from 'react';

// Components
import { Toast } from '@/components';

// Contexts
import { ToastContext } from '@/contexts';

export const ToastWrapper = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useContext(ToastContext);

  return (
    <>
      {children}

      {toast?.description && (
        <Toast
          title={toast?.title}
          description={toast?.description}
          variant={toast?.variant}
        />
      )}
    </>
  );
};
