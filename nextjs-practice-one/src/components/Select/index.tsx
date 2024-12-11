'use client';

import {
  SelectItem,
  ListboxItemSlots,
  Select as SelectNextUI,
  SelectProps as SelectNextUIProps,
  SlotsToClasses,
  extendVariants,
} from '@nextui-org/react';

// Types
import { Option } from '@/types';

// Utils
import { cn } from '@/utils';

const SelectBase = extendVariants(SelectNextUI, {
  variants: {
    color: {
      default: {
        base: 'h-fit',
        label: cn(
          'pb-8',
          'text-xs',
          'group-data-[invalid=true]:text-primary-400',
          'group-data-[filled=true]:text-primary-400 after:text-primary-400',
        ),
        innerWrapper: cn('mr-17'),
        value: cn(
          'text-xs',
          'group-data-[invalid=true]:text-red-500',
          'group-data-[has-value=true]:text-primary-300',
        ),
        trigger: cn(
          'h-21 px-12 py-10 rounded-xl',
          'group-data-[invalid=true]:data-[hover=true]:bg-red-50',
          {
            'group-data-[invalid=true]': 'bg-red-200 border-red-500 border-1',
          },
        ),
        selectorIcon: cn(
          'w-9 h-9 mr-6',
          'group-data-[invalid=true]:text-red-500',
        ),
        errorMessage: cn('mt-4 ml-4', 'text-3xs text-danger-100'),
      },
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

const SelectItemBase = extendVariants(SelectItem, {
  variants: {
    color: {
      default: {
        base: cn(
          'outline-0',
          'data-[hover=true]:bg-secondary-400 data-[selectable=true]:focus:bg-secondary-400',
        ),
        title: cn('text-xs p-2', 'text-primary-300'),
        selectedIcon: 'hidden',
      },
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

interface SelectProps extends Omit<SelectNextUIProps, 'children'> {
  options: Option[];
  'aria-label': string;
  classNameItem?: SlotsToClasses<ListboxItemSlots>;
}

export const Select = ({
  value,
  options,
  classNameItem,
  ...props
}: SelectProps) => (
  <SelectBase value={value} labelPlacement="outside" {...props}>
    {options.map((option) => (
      <SelectItemBase key={option.value} classNames={classNameItem}>
        {option.label}
      </SelectItemBase>
    ))}
  </SelectBase>
);
