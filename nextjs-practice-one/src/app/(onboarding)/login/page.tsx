import Link from 'next/link';

// Constants
import { ROUTERS } from '@/constants';

// Components
import { FormLogin } from '@/sections';
import { Image, Text } from '@/components';

// Utils
import { cn } from '@/utils';

const Page = () => (
  <div className="w-full h-full relative bg-black">
    <Image
      alt="background-image"
      src="/images/onboarding-background.webp"
      classNameWrapper="w-full h-full absolute top-0 left-0 z-[-1]"
    />
    <div className="pt-[148px]">
      <div
        className={cn(
          'w-[560px] m-auto',
          'border-2 border-secondary-400',
          'py-15 px-12 rounded-2xl backdrop-blur-xl bg-background-100/20',
        )}
      >
        <Text variants="h1" size="3xl" color="tertiary">
          Login
        </Text>
        <div className="flex gap-2 py-15">
          <Text size="xs" color="holder">
            Are you a new member?
          </Text>
          <Link href={ROUTERS.REGISTER}>
            <Text size="xs" color="primary">
              Sign up here.
            </Text>
          </Link>
        </div>
        <FormLogin />
      </div>
    </div>
  </div>
);

export default Page;
