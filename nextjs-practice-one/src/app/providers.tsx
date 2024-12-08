'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/system';

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
