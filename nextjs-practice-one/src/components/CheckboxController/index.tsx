'use client';

import {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithoutRef,
  useCallback,
} from 'react';
import { CheckboxGroup } from '@nextui-org/react';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';

// Components
import { ListCheckbox } from '../ListCheckbox';

// Types
import { OptionCheckBox } from '@/types';

interface CheckboxControllerProps<T extends FieldValues, K extends Path<T>>
  extends ComponentProps<'div'> {
  options: OptionCheckBox[];
  name: K;
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
}

export const CheckboxController = <T extends FieldValues, K extends Path<T>>({
  options,
  name,
  control,
  clearErrors,
  ...props
}: CheckboxControllerProps<T, K> &
  ComponentPropsWithoutRef<typeof CheckboxGroup>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { onChange, value } = field;

  /**
   * Function onChange checkbox and clear error if any
   * @param text - value selected
   */
  const handleOnChange = useCallback(
    async (text: ChangeEvent<HTMLInputElement>) => {
      onChange(text.target.value);
      clearErrors();
    },
    [clearErrors, onChange],
  );

  return (
    <ListCheckbox
      options={options}
      selectedValue={value}
      error={error?.message}
      onChange={handleOnChange}
      {...props}
    />
  );
};
