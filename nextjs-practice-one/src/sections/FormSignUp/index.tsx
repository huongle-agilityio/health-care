'use client';

import { useCallback, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Apis
import { login, signUp } from '@/actions';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Button, InputController, PasswordInputController } from '@/components';

// Schema
import { signUpSchema } from '@/schema';

// Stores
import { useToastStore } from '@/stores';

// Utils
import { getErrorMessage } from '@/utils';

export const FormSignUp = () => {
  const router = useRouter();

  // Stores
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
  } = useForm<z.infer<typeof signUpSchema>>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
    defaultValues: initialState,
  });

  // Function submit form
  const handleSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const payload = { username: data.email, ...data };
    try {
      const response = await signUp(payload);
      const error = await login({
        email: response.user.email,
        password: data.password,
      });

      if (error) {
        return showToast({
          description: error,
        });
      }

      router.push(ROUTES.HOME);
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
        <PasswordInputController
          control={control}
          name="password"
          clearErrors={clearErrors}
        />
      </div>
      <div className="flex flex-col gap-5">
        <Button type="submit">Submit</Button>
        <Button color="primary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};
