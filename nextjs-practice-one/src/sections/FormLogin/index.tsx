'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Components
import { Button, InputController, Text } from '@/components';

// Constants
import { ERROR_MESSAGES, REGEX_EMAIL, REGEX_PASSWORD } from '@/constants';

// Icons
import { EyeCloseIcon, EyeIcon } from '@/icons';

export const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: ERROR_MESSAGES.REQUIRED })
    .regex(REGEX_EMAIL, {
      message: ERROR_MESSAGES.INVALID_EMAIL,
    }),
  password: z
    .string()
    .min(1, { message: ERROR_MESSAGES.REQUIRED })
    .regex(REGEX_PASSWORD, {
      message: ERROR_MESSAGES.INVALID_PASSWORD,
    }),
});

export const FormLogin = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const initialState = {
    email: '',
    password: '',
  };

  const {
    control,
    clearErrors,
    reset,
    handleSubmit: submitForm,
  } = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: initialState,
  });

  const handleSubmit = () => {
    // TODO: implement feature login
  };

  const handleReset = () => {
    reset(initialState);
  };

  return (
    <>
      <form
        onSubmit={submitForm(handleSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-5">
          <InputController
            control={control}
            placeholder="Enter your email address"
            label="Email"
            name="email"
            clearErrors={clearErrors}
          />
          <InputController
            control={control}
            placeholder="Enter your password"
            label="Password"
            name="password"
            endContent={
              <div className="cursor-pointer">
                {isShowPassword ? (
                  <EyeIcon onClick={() => setIsShowPassword(false)} />
                ) : (
                  <EyeCloseIcon onClick={() => setIsShowPassword(true)} />
                )}
              </div>
            }
            type={isShowPassword ? 'text' : 'password'}
            clearErrors={clearErrors}
          />
        </div>
        <div className="flex flex-col gap-5">
          <Button type="submit" className="focus:w-full">
            Submit
          </Button>
          <Button color="primary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
      <Text size="xs" color="tertiary" className="text-center mt-10">
        Forgot Password ?
      </Text>
    </>
  );
};
