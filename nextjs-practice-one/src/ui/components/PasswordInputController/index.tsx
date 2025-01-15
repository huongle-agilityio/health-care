'use client';

import { ComponentProps, useCallback, useState } from 'react';
import {
  Control,
  useController,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';

// Components
import { Input } from '..';

// Icons
import { EyeCloseIcon, EyeIcon } from '@/ui/icons';

interface PasswordInputControllerProps<T extends FieldValues, K extends Path<T>>
  extends ComponentProps<typeof Input> {
  label?: string;
  name: K;
  control: Control<T>;
  clearErrors: UseFormClearErrors<T>;
}

export const PasswordInputController = <
  T extends FieldValues,
  K extends Path<T>,
>({
  label = 'Password',
  name,
  placeholder = 'Enter your password',
  control,
  isDisabled,
  clearErrors,
  ...props
}: PasswordInputControllerProps<T, K>) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { onChange, onBlur, value } = field;

  const handleToggleVisible = useCallback(() => {
    setIsShowPassword(!isShowPassword);
  }, [isShowPassword]);

  /**
   * Function onChange input and clear error if any
   * @param {string} text - value input
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
      placeholder={placeholder}
      endContent={
        <div className="cursor-pointer">
          {isShowPassword ? (
            <EyeIcon onClick={handleToggleVisible} />
          ) : (
            <EyeCloseIcon onClick={handleToggleVisible} />
          )}
        </div>
      }
      type={isShowPassword ? 'text' : 'password'}
      isDisabled={isDisabled}
      isInvalid={!!error?.message}
      onValueChange={handleOnChange}
      errorMessage={error?.message}
      {...props}
    />
  );
};
