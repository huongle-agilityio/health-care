'use client';

import { ComponentProps, useCallback } from 'react';
import { DateValue } from '@nextui-org/react';
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
}

export const CalendarController = <T extends FieldValues, K extends Path<T>>({
  name,
  control,
  isDisabled,
  clearErrors,
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
      clearErrors();
    },
    [clearErrors, onChange],
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
