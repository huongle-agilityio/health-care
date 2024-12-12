'use client';

// Components
import { Header } from '@/sections';
import { Button } from '@/components';

// Types
import { PageErrorProps } from '@/types';

export default function GlobalError({
  // error,
  reset,
}: PageErrorProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        <h2>Something went wrong!</h2>
        <Button variant="ghost" onClick={() => reset()}>
          Try again
        </Button>
      </body>
    </html>
  );
}
