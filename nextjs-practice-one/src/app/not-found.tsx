import Link from 'next/link';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Button, Text } from '@/ui/components';

// Icons
import { WarningIcon } from '@/ui/icons';

// Utils
import { cn } from '@/utils';

const NotFound = () => (
  <div
    className={cn(
      'flex flex-col items-center justify-center',
      'h-[calc(100vh-(88px+60px+44px))] lg:h-[calc(100vh-(88px+128px+44px))]',
    )}
  >
    <WarningIcon className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]" />
    <Text color="tertiary" className="text-center text-2xl md:text-4xl">
      404 Page Not Found
    </Text>
    <Text size="xl" color="holder" className="text-center">
      Sorry, we couldn&apos;t find the page you were looking for.
    </Text>
    <Link href={ROUTES.HOME}>
      <Button size="xs" color="primary" className="mt-10">
        Back to home page
      </Button>
    </Link>
  </div>
);

export default NotFound;
