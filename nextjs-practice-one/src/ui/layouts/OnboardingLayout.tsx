import { ReactNode } from 'react';

// Constants
import { HEADER_HEIGHT_DESKTOP, HEADER_HEIGHT_MOBILE } from '@/constants';

// Utils
import { cn } from '@/utils';

export const OnboardingLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <section
      className={cn(
        'relative',
        `min-h-[calc(100vh-${HEADER_HEIGHT_MOBILE})] lg:min-h-[calc(100vh-${HEADER_HEIGHT_DESKTOP})]`,
      )}
    >
      {children}
    </section>
  </main>
);
