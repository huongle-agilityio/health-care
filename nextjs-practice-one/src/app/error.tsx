'use client';

import Link from 'next/link';

// Components
import { Button, Text } from '@/components';

// icons
import { WarningIcon } from '@/icons';

// Constants
import { ROUTERS } from '@/constants';

const Error = () => (
  <html lang="en">
    <body className="flex flex-col items-center justify-center h-screen">
      <WarningIcon className="w-[150px] h-[150px]" />
      <Text color="tertiary" size="4xl" className="text-center">
        Error
      </Text>
      <Text size="xl" color="holder" className="text-center">
        Oops, something went wrong.
      </Text>
      <Link href={ROUTERS.HOME}>
        <Button size="xs" color="primary" className="mt-10">
          Back to home page
        </Button>
      </Link>
    </body>
  </html>
);

export default Error;
