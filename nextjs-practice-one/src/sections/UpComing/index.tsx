import Link from 'next/link';

// Components
import { Button, Text } from '@/components';

// Icons
import { UpComingIcon } from '@/icons';

// Constants
import { ROUTERS } from '@/constants';
import { cn } from '@/utils';

export const UpComing = () => (
  <div
    className={cn(
      'flex flex-col items-center justify-center',
      'h-[calc(100vh-(88px+60px+44px))] lg:h-[calc(100vh-(88px+128px+44px))]',
    )}
  >
    <UpComingIcon className="w-[150px] h-[150px] fill-primary-100" />
    <Text color="tertiary" size="4xl" className="text-center">
      Coming Soon
    </Text>
    <Text size="xl" color="holder" className="text-center">
      This feature is coming soon!
    </Text>
    <Link href={ROUTERS.HOME}>
      <Button size="xs" color="primary" className="mt-10">
        Back to home page
      </Button>
    </Link>
  </div>
);
