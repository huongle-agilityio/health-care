'use client';

import { useContext, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

// Apis
import { revalidateHomeLayout, updateUserInformation } from '@/actions';

// Components
import {
  Button,
  Image,
  InputController,
  InputFileController,
} from '@/ui/components';

// Constants
import { IMAGES } from '@/constants';

// Contexts
import { ToastContext } from '@/contexts';

// Schema
import { userSchema } from '@/schema';

// Utils
import { cn } from '@/utils';

interface FormUserInfoProps {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar: string;
}

export const FormUserInfo = ({
  id,
  email,
  name,
  phone,
  avatar,
}: FormUserInfoProps) => {
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<string>(avatar || IMAGES.FALLBACK_URL);
  const { data: user, update } = useSession();
  const { showToast } = useContext(ToastContext);

  const {
    control,
    clearErrors,
    reset,
    handleSubmit: submitForm,
    formState: { isDirty },
  } = useForm<z.infer<typeof userSchema>>({
    mode: 'onBlur',
    resolver: zodResolver(userSchema),
    defaultValues: {
      email,
      name,
      phone,
      avatar,
    },
  });

  const handleSubmit = (data: z.infer<typeof userSchema>) => {
    startTransition(async () => {
      const { data: response, error } = await updateUserInformation(data, id);

      if (error) {
        return showToast({ description: error });
      }

      reset(data);
      await update({ ...user, user: { ...user?.user, ...response } });
      revalidateHomeLayout();
    });
  };

  return (
    <form onSubmit={submitForm(handleSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col justify-between items-center md:flex-row">
        <Image
          src={preview}
          alt="Preview avatar"
          sizes="(max-width: 768px) 100px, 150px"
          classNameWrapper={cn(
            'rounded-full mt-10 md:mt-0',
            'w-[100px] h-[100px]',
            'md:w-[150px] md:h-[150px]',
          )}
        />
        <div className="w-full md:max-w-[80%]">
          <InputFileController
            label="Avatar"
            name="avatar"
            placeholder="Choice your avatar"
            onChangePreview={setPreview}
            control={control}
            clearErrors={clearErrors}
          />
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <InputController
          placeholder="Enter your name"
          label="Name"
          name="name"
          control={control}
          clearErrors={clearErrors}
        />
        <InputController
          placeholder="Enter your phone number"
          label="Phone"
          name="phone"
          control={control}
          clearErrors={clearErrors}
        />
        <InputController
          placeholder="Enter your email"
          label="Email"
          name="email"
          control={control}
          clearErrors={clearErrors}
        />
      </div>
      <div className="mt-5">
        <Button
          isLoading={isPending}
          isDisabled={!isDirty}
          size="xs"
          type="submit"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};
