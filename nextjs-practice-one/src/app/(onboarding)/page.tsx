import Link from 'next/link';

// Constants
import { ROUTERS } from '@/constants';

// Components
import { Button, Image, Text } from '@/components';

// Utils
import { cn } from '@/utils';

const Page = () => (
  <div className="bg-primary-100 fixed left-0 w-full h-full">
    <div className="container flex">
      <div className="w-[585px] pt-20 md:pt-[194px]">
        <div className="flex flex-col gap-8">
          <Text
            variants="h1"
            size="4xl"
            color="light"
            className="text-[40px] md:text-[60px]"
          >
            Health in Your Hands.
          </Text>
          <Text size="xl" className="text-xl text-secondary-200">
            Take control of your healthcare with CareMate. Book appointments
            with ease, explore health blogs, and stay on top of your well-being,
            all in one place.
          </Text>
        </div>

        <Link href={ROUTERS.APPOINTMENTS}>
          <Button
            className={cn(
              'mt-12 md:mt-25',
              'bg-background-100 text-primary-300 text-base',
            )}
          >
            Get Started
          </Button>
        </Link>
      </div>

      <Image
        alt="image-dentist"
        src="/images/dentist.webp"
        classNameWrapper={cn(
          'hidden xl:block',
          'min-w-[800px] h-full fixed right-0',
        )}
      />
    </div>
  </div>
);

export default Page;
