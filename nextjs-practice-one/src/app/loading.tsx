'use client';

import { Spinner } from '@nextui-org/react';

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <Spinner
      label="Loading..."
      color="current"
      classNames={{
        circle1: 'w-[40px] h-[40px] left-6',
        circle2: 'w-[40px] h-[40px] left-6',
        base: 'w-[80px] h-[80px]',
        wrapper: 'w-[80px] h-[80px]',
        label: 'text-primary-100',
      }}
    />
  </div>
);

export default Loading;
