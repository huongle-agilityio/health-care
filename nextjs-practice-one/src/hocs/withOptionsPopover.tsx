'use client';

import { ComponentType } from 'react';
import { PopoverProps, Skeleton } from '@nextui-org/react';
import dynamic from 'next/dynamic';

// Types
import { OptionMenu } from '@/types';

const Popover = dynamic(
  () => import('../components/Popover').then((mod) => mod.Popover),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="rounded-full w-16 h-16">
        <div className="h-24 rounded-lg bg-secondary" />
      </Skeleton>
    ),
  },
);

type Props<P> = P & {
  menuOptions: OptionMenu[];
  placement?: PopoverProps['placement'];
};

export const withOptionsPopover = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const RenderWithOptionsPopover = (props: Props<P>) => {
    const { menuOptions = [], placement = 'bottom-end', ...rest } = props;

    return (
      <Popover menuOptions={menuOptions} placement={placement}>
        <WrappedComponent {...(rest as P)} />
      </Popover>
    );
  };
  return RenderWithOptionsPopover;
};
