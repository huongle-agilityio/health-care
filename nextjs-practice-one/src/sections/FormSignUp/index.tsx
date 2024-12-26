'use client';

import { useCallback, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Apis
import { signUp } from '@/actions';

// Constants
import {
  ERROR_MESSAGES,
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_PHONE_NUMBER,
  ROUTERS,
  SESSION_STORAGE_KEYS,
} from '@/constants';

// Components
import { Button, InputController } from '@/components';

// Icons
import { EyeCloseIcon, EyeIcon } from '@/icons';

// Stores
import { useToastStore, useUserStore } from '@/stores';

// Utils
import { getErrorMessage } from '@/utils';

const FormSchema = z.object({
  name: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED }),
  phone: z
    .string()
    .min(1, { message: ERROR_MESSAGES.REQUIRED })
    .min(11, { message: ERROR_MESSAGES.MAX_PHONE_NUMBER })
    .regex(REGEX_PHONE_NUMBER, {
      message: ERROR_MESSAGES.INVALID_PHONE,
    }),
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

export const FormSignUp = () => {
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  // Stores
  const { setUser, setAuthenticated } = useUserStore();
  const { showToast } = useToastStore();

  const initialState = useMemo(
    () => ({
      name: '',
      email: '',
      password: '',
      phone: '',
    }),
    [],
  );

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

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const payload = { username: data.email, ...data };
    try {
      const data = await signUp(payload);

      sessionStorage.setItem(SESSION_STORAGE_KEYS.TOKEN, data.jwt);

      setUser(data.user);
      setAuthenticated(true);
      router.push(ROUTERS.HOME);
    } catch (error) {
      showToast({
        description: getErrorMessage(error),
      });
    }
  };

  const handleReset = useCallback(() => {
    reset(initialState);
  }, [initialState, reset]);

  return (
    <form onSubmit={submitForm(handleSubmit)} className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <InputController
          control={control}
          placeholder="Enter your name"
          label="Name"
          name="name"
          clearErrors={clearErrors}
        />
        <InputController
          control={control}
          placeholder="Enter your phone number"
          label="Phone"
          name="phone"
          type="number"
          clearErrors={clearErrors}
        />
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
  );
};