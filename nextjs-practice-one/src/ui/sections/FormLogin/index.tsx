'use client';

import { useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

// Contexts
import { ToastContext } from '@/contexts';

// Utils
import { loginSchema } from '@/schema';

export const FormLogin = () => {
  const router = useRouter();

  // Contexts
  const { showToast } = useContext(ToastContext);

  const initialState = {
    email: '',
    password: '',
  };

  const {
    control,
    clearErrors,
    handleSubmit: submitForm,
    formState: { isDirty },
  } = useForm<z.infer<typeof loginSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
    defaultValues: initialState,
  });

  /**
   * Handles form submission for login.
   * @param {z.infer<typeof loginSchema>} data - The form data conforming to the login schema.
   */
  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    const error = await login(data);

    if (error) {
      return showToast({
        description: error,
      });
    }

    router.push(ROUTES.HOME);
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
        <div className="flex flex-col gap-5">
          <Button type="submit">Submit</Button>
          <Button type="reset" isDisabled={!isDirty} color="primary">
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
