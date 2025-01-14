'use client';

import { useCallback, useContext } from 'react';
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
    reset,
    handleSubmit: submitForm,
    formState: { isDirty },
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

    router.push(ROUTES.HOME);
  };

  // Function reset form
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

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
          <Button isDisabled={!isDirty} color="primary" onPress={handleReset}>
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
