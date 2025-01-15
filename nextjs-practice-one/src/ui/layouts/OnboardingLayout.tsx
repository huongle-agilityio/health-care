import { ReactNode } from 'react';

// Constants
import {
  SCREEN_HEIGHT_WITHOUT_FOOTER_DESKTOP,
  SCREEN_HEIGHT_WITHOUT_FOOTER_MOBILE,
} from '@/constants';

// Utils
import { cn } from '@/utils';

export const OnboardingLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <section
      className={cn(
        'relative',
        SCREEN_HEIGHT_WITHOUT_FOOTER_MOBILE,
        SCREEN_HEIGHT_WITHOUT_FOOTER_DESKTOP,
      )}
    >
      {children}
    </section>
  </main>
);
