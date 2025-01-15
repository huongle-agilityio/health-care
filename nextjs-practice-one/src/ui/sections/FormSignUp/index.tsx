'use client';

import { useCallback, useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Apis
import { login, signUp } from '@/actions';

// Constants
import { ROUTES } from '@/constants';

// Components
import {
  Button,
  InputController,
  PasswordInputController,
} from '@/ui/components';

// Schema
import { signUpSchema } from '@/schema';

// Contexts
import { ToastContext } from '@/contexts';

// Utils
import { getErrorMessage } from '@/utils';

export const FormSignUp = () => {
  const router = useRouter();

  // Contexts
  const { showToast } = useContext(ToastContext);

  const initialState = {
    name: '',
    email: '',
    password: '',
    phone: '',
  };

  const {
    control,
    clearErrors,
    reset,
    handleSubmit: submitForm,
    formState: { isDirty },
  } = useForm<z.infer<typeof signUpSchema>>({
    mode: 'onBlur',
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
    reset();
  }, [reset]);

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
          maxLength={10}
          label="Phone"
          name="phone"
          type="tel"
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
        <Button color="primary" isDisabled={!isDirty} onPress={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};
