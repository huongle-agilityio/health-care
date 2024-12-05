'use client';

import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/system';

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
