'use client';

// Components
import { Header } from '@/sections';
import { Button } from '@/components';

// Types
import { PageErrorProps } from '@/types';

const GlobalError = ({ reset }: PageErrorProps) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <h2>Something went wrong!</h2>
        <Button color="danger" size="xs" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
};

export default GlobalError;
