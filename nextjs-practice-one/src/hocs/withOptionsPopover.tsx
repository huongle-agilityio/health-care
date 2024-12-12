'use client';

import { ComponentType, ReactNode, Suspense } from 'react';
import { PopoverProps } from '@nextui-org/react';
import dynamic from 'next/dynamic';

// Types
import { OptionMenu } from '@/types';

const Popover = dynamic(
  () => import('../components/Popover').then((mod) => mod.Popover),
  {
    ssr: false,
  },
);

type Props<P> = P & {
  menuOptions: OptionMenu[];
  placement?: PopoverProps['placement'];
  loadingFallback?: ReactNode;
};

export const withOptionsPopover = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const RenderWithOptionsPopover = (props: Props<P>) => {
    const {
      loadingFallback,
      menuOptions = [],
      placement = 'bottom-end',
      ...rest
    } = props;
    return (
      <Suspense fallback={loadingFallback ?? null}>
        <Popover menuOptions={menuOptions} placement={placement}>
          <WrappedComponent {...(rest as P)} />
        </Popover>
      </Suspense>
    );
  };
  return RenderWithOptionsPopover;
};
