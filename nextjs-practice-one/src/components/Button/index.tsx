'use client';

import { extendVariants, Button as ButtonNextUI } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';
import { ComponentProps } from 'react';

export const ButtonBase = extendVariants(ButtonNextUI, {
  variants: {
    variant: {
      bordered: 'border-2',
    },
    color: {
      default: 'bg-primary-100 disabled:bg-background-400 text-primary-500',
      primary: 'bg-background-300 disabled:bg-secondary-300 text-primary-500',
      bordered:
        'bg-transparent border-primary border-secondary-100 text-primary-300',
    },
    size: {
      none: 'py-0 px-10 text-xs',
      xs: 'py-6 px-16 h-19 text-xs',
      md: 'py-10 px-20 h-21 text-xs',
      lg: 'py-10 px-18 h-22 text-base',
    },
    radius: {
      none: 0,
      md: 'rounded-xl',
      lg: 'rounded-sm',
    },
  },
  defaultVariants: {
    radius: 'md',
    variant: 'solid',
    color: 'default',
    size: 'md',
  },
});

export const Button = ({
  className,
  ...props
}: ComponentProps<typeof ButtonBase>) => (
  <ButtonBase
    className={cn('data-[pressed=true]:scale-[1]', className)}
    {...props}
  />
);
