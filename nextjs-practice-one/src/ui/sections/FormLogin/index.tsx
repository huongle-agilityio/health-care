'use client';

import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

// Apis
import { login } from '@/actions';

// Constants
import { ROUTES } from '@/constants';

// Components
import {
  Button,
  InputController,
  PasswordInputController,
  Text,
} from '@/ui/components';

// Utils
import { loginSchema } from '@/schema';

interface FormData {
  email: string;
  password: string;
}

export const FormLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const initialState = {
    email: '',
    password: '',
  };

  const {
    control,
    clearErrors,
    handleSubmit: submitForm,
    formState: { isDirty },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
    defaultValues: initialState,
  });

  /**
   * Handles form submission for login.
   * @param {FormData} data - The form data conforming to the login schema.
   */
  const handleSubmit = (data: FormData) => {
    startTransition(async () => {
      const backTo = searchParams.get('backTo');
      const error = await login(data);

      if (error) {
        return setError(error);
      }

      return backTo ? router.push(backTo) : router.push(ROUTES.HOME);
    });
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
            isDisabled={!isDirty}
            color="primary"
          >
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
