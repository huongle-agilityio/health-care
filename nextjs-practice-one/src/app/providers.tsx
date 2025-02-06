'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { HeroUIProvider } from '@heroui/system';

// Contexts
import { ToastProvider } from '@/contexts';

export interface ProvidersProps {
  session: Session | null;
  children: ReactNode;
}

export const Providers = ({ session, children }: ProvidersProps) => (
  <SessionProvider session={session}>
    <HeroUIProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </HeroUIProvider>
  </SessionProvider>
);
