'use client';

import { memo } from 'react';
import { parseDate } from '@internationalized/date';

import {
  Calendar as CalendarNextUI,
  CalendarProps as CalendarNextUIProps,
  DateValue,
  extendVariants,
} from '@nextui-org/react';

// Components
import { Text } from '..';

// Utils
import { cn, isDateUnavailable, todayWithFormat } from '@/utils';

export const CalendarBase = extendVariants(CalendarNextUI, {
  variants: {
    color: {
      default: {
        base: 'py-6 bg-primary-500',
        gridBodyRow: 'gap-1',
        gridHeaderCell: 'w-17 h-17',
        gridBody: 'bg-primary-500',
        cellButton: cn(
          'bg-transparent',
          'w-17 h-17 rounded-sm border-1 border-primary-500',
          'data-[selected=true]:border-primary-200 data-[selected=true]:bg-secondary-100',
          'data-[unavailable=true]:no-underline',
        ),
      },
    },
    size: {
      md: {
        base: 'min-w-[310px]',
        content: 'min-w-[310px]',
        gridHeaderRow: 'min-w-[310px]',
      },
      lg: {
        base: 'min-w-[350px]',
        content: 'min-w-[350px]',
        gridHeaderRow: 'min-w-[350px]',
      },
    },
  },
  defaultVariants: {
    color: 'default',
    size: 'md',
  },
});

export interface CalendarProps extends CalendarNextUIProps {
  value?: DateValue;
  error?: string;
  size?: 'md' | 'lg';
}

export const Calendar = memo(({ value, error, ...props }: CalendarProps) => {
  const date = value
    ? parseDate(value.toString())
    : parseDate(todayWithFormat());

  return (
    <div className="flex-col">
      <CalendarBase
        disableAnimation
        value={date}
        isDateUnavailable={isDateUnavailable}
        {...props}
      />
      {error && (
        <Text size="xs" color="error">
          {error}
        </Text>
      )}
    </div>
  );
});

Calendar.displayName = 'Calendar';
