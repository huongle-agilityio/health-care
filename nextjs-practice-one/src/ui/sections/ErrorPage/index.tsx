import Link from 'next/link';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Button, Text } from '@/ui/components';

// icons
import { WarningIcon } from '@/ui/icons';

export const ErrorPage = ({ reset }: { reset: () => void }) => {
  const handleReset = () => {
    reset();
  };

  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center h-screen">
        <WarningIcon className="w-[100px] h-[100px] md:w-[150px] md:h-[150px]" />
        <Text color="tertiary" className="text-center text-2xl md:text-4xl">
          Error
        </Text>
        <Text size="xl" color="holder" className="text-center">
          Oops, something went wrong.
        </Text>
        <div className="flex flex-col mt-10 gap-9">
          <Button size="xs" color="default" onPress={handleReset}>
            Try again
          </Button>
          <Link href={ROUTES.HOME} className="flex items-center justify-center">
            <Text size="xs" color="primary" className="underline">
              Back to home page &rarr;
            </Text>
          </Link>
        </div>
      </body>
    </html>
  );
};
