'use client';

import { useRouter } from 'next/navigation';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Button } from '@/ui/components';

export const HeaderAuthButtons = ({ onPress }: { onPress?: () => void }) => {
  const router = useRouter();

  const handleNavigateLogin = () => {
    onPress?.();
    router.push(ROUTES.LOGIN);
  };

  const handleNavigateRegister = () => {
    onPress?.();
    router.push(ROUTES.REGISTER);
  };

  return (
    <>
      <Button
        size="xs"
        variant="bordered"
        color="bordered"
        onPress={handleNavigateLogin}
        className="w-full xl:w-fit"
      >
        Login
      </Button>
      <Button
        size="xs"
        onPress={handleNavigateRegister}
        className="w-full xl:w-fit"
      >
        Register
      </Button>
    </>
  );
};
