'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/system';

// Components
import { Toast } from '@/components';

// Stores
import { useToastStore } from '@/stores';

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const { toast } = useToastStore();

  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}

        {toast?.description && (
          <Toast
            title={toast?.title}
            description={toast?.description}
            variant={toast?.variant}
          />
        )}
      </ThemeProvider>
    </NextUIProvider>
  );
}
