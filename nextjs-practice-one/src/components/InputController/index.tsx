import { ComponentProps, useCallback } from 'react';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';

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
      onChange(text);
      clearErrors();
    },
    [clearErrors, onChange],
  );

  return (
    <Input
      label={label}
      value={value}
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
