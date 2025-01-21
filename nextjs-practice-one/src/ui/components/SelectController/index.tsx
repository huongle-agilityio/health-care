'use client';

import { ComponentProps, useCallback } from 'react';
import { SharedSelection } from '@heroui/system';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';

// Components
import { Select } from '..';

// Types
import { Option } from '@/types';

interface SelectControllerProps<T extends FieldValues, K extends Path<T>>
  extends ComponentProps<typeof Select> {
  label: string;
  name: K;
  options: Option[];
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
}

export const SelectController = <T extends FieldValues, K extends Path<T>>({
  label,
  options,
  name,
  control,
  isDisabled,
  clearErrors,
  ...props
}: SelectControllerProps<T, K>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { onChange, value } = field;

  /**
   * Function onChange select and clear error if any
   * @param text - value select
   */
  const handleOnChange = useCallback(
    (text: SharedSelection) => {
      onChange(text['anchorKey']);
      clearErrors();
    },
    [clearErrors, onChange],
  );

  return (
    <Select
      label={label}
      options={options}
      isDisabled={isDisabled}
      isInvalid={!!error?.message}
      onSelectionChange={handleOnChange}
      errorMessage={error?.message}
      {...props}
      value={value}
    />
  );
};
