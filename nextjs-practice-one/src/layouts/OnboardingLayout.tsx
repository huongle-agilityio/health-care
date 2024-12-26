import { ReactNode } from 'react';

export const OnboardingLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <section
      // 60px is the height of the header mobile and 128px for desktop
      className={`min-h-[calc(100vh-60px)] lg:min-h-[calc(100vh-128px)] relative"`}
    >
      {children}
    </section>
  </main>
);
