'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { HeroUIProvider } from '@heroui/system';

// Contexts
import { ToastProvider } from '@/contexts';

export interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <HeroUIProvider>
    <ThemeProvider attribute="class" defaultTheme="light">
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  </HeroUIProvider>
);
