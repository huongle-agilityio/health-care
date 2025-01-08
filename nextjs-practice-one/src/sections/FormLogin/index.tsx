'use client';

import { useCallback, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Apis
import { login } from '@/actions';

// Constants
import { ROUTERS } from '@/constants';

// Components
import { Button, InputController, Text } from '@/components';

// Icons
import { EyeCloseIcon, EyeIcon } from '@/icons';

// Stores
import { useToastStore } from '@/stores';

// Utils
import { loginSchema } from '@/schema';

export const FormLogin = () => {
  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  // Stores
  const { showToast } = useToastStore();

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
  } = useForm<z.infer<typeof loginSchema>>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues: initialState,
  });

  // Function submit form
  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    const error = await login(data);

    if (error) {
      return showToast({
        description: error,
      });
    }

    router.push(ROUTERS.HOME);
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
