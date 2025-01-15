'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/system';

// Contexts
import { ToastProvider } from '@/contexts';

export interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <NextUIProvider>
    <ThemeProvider attribute="class" defaultTheme="light">
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  </NextUIProvider>
);
