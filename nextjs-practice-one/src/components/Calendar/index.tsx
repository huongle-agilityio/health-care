'use client';

import { getLocalTimeZone, isWeekend, today } from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import {
  Calendar as CalendarNextUI,
  CalendarProps as CalendarNextUIProps,
  DateValue,
  extendVariants,
} from '@nextui-org/react';

// Components
import { Text } from '..';

// Utils
import { cn } from '@/utils';

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

export const Calendar = ({ value, error, ...props }: CalendarProps) => {
  const { locale } = useLocale();
  const now = today(getLocalTimeZone());

  const isDateUnavailable = (date: DateValue) =>
    // Disable weekends
    isWeekend(date, locale) ||
    // Disable the day before
    date.compare(now) < 0;

  return (
    <div className="flex-col">
      <CalendarBase
        value={value}
        isDateUnavailable={isDateUnavailable}
        defaultValue={today(getLocalTimeZone())}
        {...props}
      />
      {error && (
        <Text size="3xs" color="error">
          {error}
        </Text>
      )}
    </div>
  );
};
