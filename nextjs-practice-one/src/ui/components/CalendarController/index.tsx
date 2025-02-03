'use client';

import { ComponentProps, useCallback } from 'react';
import { DateValue } from '@heroui/react';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';

// Components
import { Calendar } from '..';

// Utils
import { getDateWithFormat } from '@/utils';

interface CalendarControllerProps<T extends FieldValues, K extends Path<T>>
  extends ComponentProps<typeof Calendar> {
  name: K;
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
  onClick?: () => void;
}

export const CalendarController = <T extends FieldValues, K extends Path<T>>({
  name,
  control,
  isDisabled,
  clearErrors,
  onClick,
  ...props
}: CalendarControllerProps<T, K>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { onChange, onBlur, value } = field;

  /**
   * Function onChange calendar and clear error if any
   * @param text - value calendar
   */
  const handleOnChange = useCallback(
    (text: DateValue) => {
      onChange(getDateWithFormat(text));
      onClick?.();
      clearErrors(name);
    },
    [clearErrors, name, onChange, onClick],
  );

  return (
    <Calendar
      onBlur={onBlur}
      isDisabled={isDisabled}
      onChange={handleOnChange}
      error={error?.message}
      {...props}
      value={value}
    />
  );
};
