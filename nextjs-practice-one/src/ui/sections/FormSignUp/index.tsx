'use client';

import { useState, useTransition } from 'react';
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
  Text,
} from '@/ui/components';

// Schema
import { signUpSchema } from '@/schema';

// Utils
import { getErrorMessage } from '@/utils';

export const FormSignUp = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const initialState = {
    name: '',
    email: '',
    password: '',
    phone: '',
  };

  const {
    control,
    clearErrors,
    handleSubmit: submitForm,
    formState: { isDirty },
  } = useForm<z.infer<typeof signUpSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
    defaultValues: initialState,
  });

  /**
   * Handles form submission for sign-up.
   * @param {z.infer<typeof signUpSchema>} data - The form data conforming to the sign-up schema.
   */
  const handleSubmit = (data: z.infer<typeof signUpSchema>) => {
    startTransition(async () => {
      const payload = { username: data.email, ...data };
      try {
        const response = await signUp(payload);

        // Fetch api login after signup success
        const error = await login({
          email: response.user.email,
          password: data.password,
        });

        if (error) {
          return setError(error);
        }

        router.push(ROUTES.HOME);
      } catch (error) {
        setError(getErrorMessage(error));
      }
    });
  };

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
      {error && (
        <Text size="xs" className="text-danger-100">
          {error}
        </Text>
      )}
      <div className="flex flex-col gap-5">
        <Button isLoading={isPending} type="submit">
          Submit
        </Button>
        <Button
          isLoading={isPending}
          type="reset"
          color="primary"
          isDisabled={!isDirty}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};
