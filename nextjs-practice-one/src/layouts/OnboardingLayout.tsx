import { ReactNode } from 'react';

export const OnboardingLayout = ({ children }: { children: ReactNode }) => (
  <main>
    <section className={`h-[calc(100vh-60px)] lg:h-[calc(100vh-128px)]`}>
      {children}
    </section>
  </main>
);
