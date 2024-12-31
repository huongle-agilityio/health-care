import Link from 'next/link';

// Components
import { Button, Text } from '@/components';

// Icons
import { UpComingIcon } from '@/icons';

// Constants
import { ROUTERS } from '@/constants';

// Utils
import { cn } from '@/utils';

export const UpComing = () => (
  <div
    className={cn(
      'flex flex-col items-center justify-center',
      'h-[calc(100vh-(88px+60px+44px))] lg:h-[calc(100vh-(88px+128px+44px))]',
    )}
  >
    <UpComingIcon className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] fill-primary-100" />
    <Text color="tertiary" className="text-center text-2xl md:text-4xl">
      Coming Soon
    </Text>
    <Text size="xl" color="holder" className="text-center">
      This feature is coming soon!
    </Text>
    <Link href={ROUTERS.HOME} className="mt-10">
      <Button color="primary">Back to home page</Button>
    </Link>
  </div>
);
