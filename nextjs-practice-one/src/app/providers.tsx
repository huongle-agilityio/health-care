'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/system';

// Contexts
import { ToastProvider } from '@/contexts';

// Sections
import { ToastWrapper } from '@/sections';

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <ToastProvider>
          <ToastWrapper>{children}</ToastWrapper>
        </ToastProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
}
