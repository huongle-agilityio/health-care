'use client';

import {
  extendVariants,
  ModalBody,
  ModalContent,
  Modal as ModalNextUI,
  useDisclosure,
} from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';

import { NAVIGATION_ITEMS, ROUTES } from '@/constants';

// Components
import { Button } from '@/ui/components';
import { NavbarList } from './NavbarList';

// Icons
import {
  CloseIcon,
  OutlineBurgerIcon,
  SchedulesIcon,
  SettingIcon,
} from '@/ui/icons';

// HOCs
import { withLogoutModal } from '@/hocs';

// Utils
import { cn } from '@/utils';

const NavBarMobileBase = extendVariants(ModalNextUI, {
  variants: {
    color: {
      default: {
        wrapper: cn('fixed w-5/6 h-lvh', 'overflow-visible justify-start'),
        base: 'w-full h-full shadow-none !m-0 rounded-none',
        closeButton: 'mr-6 mt-6',
      },
    },
  },
  defaultVariants: {
    placement: 'center',
    color: 'default',
  },
});

const LogoutButton = withLogoutModal(Button);

export const NavBarMobile = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isOpen, onOpenChange } = useDisclosure();

  const options = isAuthenticated
    ? [
        ...NAVIGATION_ITEMS,
        {
          title: 'Setting',
          url: ROUTES.SETTING,
          icon: SettingIcon,
        },
        {
          url: ROUTES.SCHEDULES,
          title: 'Schedules',
          icon: SchedulesIcon,
        },
      ]
    : NAVIGATION_ITEMS;

  return (
    <div className="absolute top-6 left-12">
      <OutlineBurgerIcon
        size="16"
        className="xl:hidden cursor-pointer"
        onClick={onOpenChange}
      />
      <div className="xl:hidden">
        <NavBarMobileBase
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          closeButton={<CloseIcon size="17" />}
        >
          <ModalContent>
            {(onClose) => {
              const handleNavigateLogin = () => {
                onClose();
                router.push(ROUTES.LOGIN);
              };

              const handleNavigateRegister = () => {
                onClose();
                router.push(ROUTES.REGISTER);
              };

              return (
                <ModalBody className="pt-25 px-12 gap-12">
                  <div className="flex flex-col gap-12">
                    <NavbarList
                      pathname={pathname}
                      options={options}
                      onClose={onClose}
                    />

                    {isAuthenticated ? (
                      <LogoutButton size="xs">Logout</LogoutButton>
                    ) : (
                      <div className="flex flex-col gap-8">
                        <Button
                          size="xs"
                          variant="bordered"
                          color="bordered"
                          onPress={handleNavigateLogin}
                          className="w-full"
                        >
                          Login
                        </Button>
                        <Button
                          size="xs"
                          onPress={handleNavigateRegister}
                          className="w-full"
                        >
                          Register
                        </Button>
                      </div>
                    )}
                  </div>
                </ModalBody>
              );
            }}
          </ModalContent>
        </NavBarMobileBase>
      </div>
    </div>
  );
};
