import { ReactNode } from 'react';

// Sections
import { Footer } from '@/sections';

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <section
      // 88px is the height of the footer
      // 60px is the height of the header mobile and 128px for desktop
      className={`min-h-[calc(100vh-(88px+60px))] lg:min-h-[calc(100vh-(88px+128px))]`}
    >
      {children}
    </section>
    <Footer />
  </main>
);
