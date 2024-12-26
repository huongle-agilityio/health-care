// Components
import { Image } from '@/components';

// Utils
import { cn } from '@/utils';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full">
    <Image
      alt="background-image"
      src="/images/onboarding-background.webp"
      classNameWrapper="w-full h-full fixed top-0 left-0 z-[-1]"
    />
    <div className="py-20 md:pt-[148px] container mx-auto">
      <div
        className={cn(
          'md:w-[560px] m-auto',
          'border-2 border-secondary-400',
          'py-15 px-12 rounded-2xl backdrop-blur-xl bg-background-100/20',
        )}
      >
        {children}
      </div>
    </div>
  </div>
);

export default Layout;
