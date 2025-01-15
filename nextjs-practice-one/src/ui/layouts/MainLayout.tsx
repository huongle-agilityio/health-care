import { ReactNode } from 'react';

// Sections
import { Footer } from '@/ui/sections';

// Constants
import {
  SCREEN_HEIGHT_WITH_FOOTER_DESKTOP,
  SCREEN_HEIGHT_WITH_FOOTER_MOBILE,
} from '@/constants';

// Utils
import { cn } from '@/utils';

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <section
      className={cn(
        'pb-19',
        SCREEN_HEIGHT_WITH_FOOTER_MOBILE,
        SCREEN_HEIGHT_WITH_FOOTER_DESKTOP,
      )}
    >
      {children}
    </section>
    <Footer />
  </main>
);
