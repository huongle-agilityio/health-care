'use client';

import { extendVariants, Input as NextUIInput } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

export const Input = extendVariants(NextUIInput, {
  variants: {
    color: {
      default: {
        inputWrapper: cn(
          'py-10 px-12',
          'bg-background-500 data-[hover=true]:bg-background-500/50 rounded-xl',
          'group-data-[invalid=true]:data-[hover=true]:!bg-red-50',
          'group-data-[invalid=true]:!bg-red-200',
        ),
        input: cn(
          'text-xs',
          'group-data-[invalid=true]:text-red-500 group-data-[invalid=true]:placeholder:text-red-500',
          'group-data-[has-value=true]:text-primary-300 placeholder:text-primary-400',
        ),
        errorMessage: cn('text-3xs text-danger-100'),
        label: cn(
          'text-xs',
          'group-data-[invalid=true]:text-primary-400',
          'group-data-[filled=true]:text-primary-400 after:text-primary-400',
        ),
      },
    },
    size: {
      sm: {
        base: 'data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_10px)]',
        mainWrapper: 'h-[68px]',
        inputWrapper: 'min-h-18',
        label: 'pb-4',
        errorMessage: 'mt-2 ml-2',
      },
      md: {
        base: 'data-[has-label=true]:mt-[calc(theme(fontSize.small)_+_18px)]',
        mainWrapper: 'group-data-[invalid=true]:h-[88px]',
        inputWrapper: 'min-h-21',
        label: 'pb-6',
        errorMessage: 'mt-4 ml-4',
      },
    },
  },
  defaultVariants: {
    labelPlacement: 'outside',
    color: 'default',
    size: 'md',
  },
});
