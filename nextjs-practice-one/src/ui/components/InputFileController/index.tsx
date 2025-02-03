'use client';

import { ChangeEvent, ComponentProps, useCallback, useMemo } from 'react';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';

// Components
import { Input } from '..';

interface InputFileControllerProps<T extends FieldValues, K extends Path<T>>
  extends ComponentProps<typeof Input> {
  name: K;
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
  onChangePreview?: (file: string) => void;
}

export const InputFileController = <T extends FieldValues, K extends Path<T>>({
  label,
  type = 'file',
  accept = 'image/jpeg,image/jpg,image/png,image/webp',
  name,
  control,
  isDisabled,
  onChangePreview,
  clearErrors,
  ...props
}: InputFileControllerProps<T, K>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { onChange } = field;

  const classNames = useMemo(
    () => ({
      inputWrapper: 'p-0',
      input: 'cursor-pointer p-11 text-primary-400',
      innerWrapper: 'cursor-pointer',
    }),
    [],
  );

  /**
   * Function onChange input and clear error if any
   * @param event - value input
   */
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        onChange(file);
        onChangePreview?.(URL.createObjectURL(file));
        clearErrors(name);
      }
    },
    [clearErrors, name, onChange, onChangePreview],
  );

  return (
    <Input
      type={type}
      accept={accept}
      label={label}
      isDisabled={isDisabled}
      isInvalid={!!error?.message}
      onChange={handleOnChange}
      errorMessage={error?.message}
      classNames={classNames}
      {...props}
    />
  );
};
