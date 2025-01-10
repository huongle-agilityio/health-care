import { ReactNode } from 'react';

// Sections
import { Footer } from '@/ui/sections';

// Constants
import {
  FOOTER_HEIGHT,
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from '@/constants';

// Utils
import { cn } from '@/utils';

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <section
      className={cn(
        'pb-19',
        `min-h-[calc(100vh-(${FOOTER_HEIGHT}+${HEADER_HEIGHT_MOBILE}))] lg:min-h-[calc(100vh-(${FOOTER_HEIGHT}+${HEADER_HEIGHT_DESKTOP}))]`,
      )}
    >
      {children}
    </section>
    <Footer />
  </main>
);
