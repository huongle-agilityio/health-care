'use client';

import { ComponentProps, useCallback } from 'react';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';

// Constants
import { REGEX_NON_NUMBER } from '@/constants';

// Components
import { Input } from '..';

interface InputControllerProps<T extends FieldValues, K extends Path<T>>
  extends ComponentProps<typeof Input> {
  label: string;
  name: K;
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
}

export const InputController = <T extends FieldValues, K extends Path<T>>({
  label,
  type,
  maxLength,
  name,
  control,
  isDisabled,
  clearErrors,
  ...props
}: InputControllerProps<T, K>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { onChange, onBlur, value } = field;

  /**
   * Function onChange input and clear error if any
   * @param text - value input
   */
  const handleOnChange = useCallback(
    (text: string) => {
      // Remove non number characters if type is tel
      if ((type === 'tel' && maxLength) || type === 'number') {
        text = text.replace(REGEX_NON_NUMBER, '');
      }

      onChange(text);
      clearErrors(name);
    },
    [clearErrors, maxLength, name, onChange, type],
  );

  return (
    <Input
      type={type}
      label={label}
      maxLength={maxLength}
      value={value?.toString()}
      onBlur={onBlur}
      autoComplete="off"
      isDisabled={isDisabled}
      isInvalid={!!error?.message}
      onValueChange={handleOnChange}
      errorMessage={error?.message}
      {...props}
    />
  );
};
