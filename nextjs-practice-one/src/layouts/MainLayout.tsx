import { ReactNode } from 'react';

// Sections
import { Footer } from '@/sections';

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <section
      className={`h-[calc(100vh-(88px+60px))] lg:h-[calc(100vh-(88px+128px))]`}
    >
      {children}
    </section>
    <Footer />
  </main>
);
