'use client';

import { useCallback, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Cookies from 'universal-cookie';

// Apis
import { signIn } from '@/actions';

// Constants
import {
  ERROR_MESSAGES,
  REGEX_EMAIL,
  REGEX_PASSWORD,
  ROUTERS,
  COOKIES_KEYS,
  TIMING,
} from '@/constants';

// Components
import { Button, InputController, Text } from '@/components';

// Icons
import { EyeCloseIcon, EyeIcon } from '@/icons';

// Stores
import { useToastStore, useUserStore } from '@/stores';

// Utils
import { getErrorMessage } from '@/utils';

const formSchema = z.object({
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
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  // Stores
  const { setUser } = useUserStore();
  const { showToast } = useToastStore();
  const cookies = new Cookies();

  const initialState = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  );

  const {
    control,
    clearErrors,
    reset,
    handleSubmit: submitForm,
  } = useForm<z.infer<typeof formSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: initialState,
  });

  // Function submit form
  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const payload = { identifier: data.email, ...data };

    try {
      const data = await signIn(payload);

      cookies.set(COOKIES_KEYS.TOKEN, data.jwt, {
        path: ROUTERS.HOME,
        secure: true,
        sameSite: 'strict',
        maxAge: TIMING.COOKIES_TIMEOUT,
      });

      setUser(data.user);
      router.push(ROUTERS.HOME);
    } catch (error) {
      showToast({
        description: getErrorMessage(error),
      });
    }
  };

  // Function reset form
  const handleReset = useCallback(() => {
    reset(initialState);
  }, [initialState, reset]);

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
