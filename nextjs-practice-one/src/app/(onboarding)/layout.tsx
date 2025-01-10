import { ReactNode } from 'react';

// Layouts
import { OnboardingLayout } from '@/layouts';

const Layout = ({ children }: { children: ReactNode }) => (
  <OnboardingLayout>{children}</OnboardingLayout>
);

export default Layout;
