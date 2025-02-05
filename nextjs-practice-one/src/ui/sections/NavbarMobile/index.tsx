'use client';

import {
  extendVariants,
  ModalBody,
  ModalContent,
  Modal as ModalNextUI,
  useDisclosure,
} from '@heroui/react';
import { usePathname } from 'next/navigation';

import { getNavigationItemsHiddenByRole, USER_ROLE } from '@/constants';

// Components
import { Button, Text } from '@/ui/components';
import { NavbarList } from './NavbarList';
import { HeaderAuthButtons } from '../HeaderAuth/HeaderAuthButtons';

// Icons
import { CloseIcon, OutlineBurgerIcon, UserIcon } from '@/ui/icons';

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

interface NavBarMobileProps {
  isAuthenticated: boolean;
  name?: string;
  userRole?: USER_ROLE;
}

export const NavBarMobile = ({
  isAuthenticated,
  userRole,
  name,
}: NavBarMobileProps) => {
  const pathname = usePathname();
  const { isOpen, onOpenChange } = useDisclosure();

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
            {(onClose) => (
              <ModalBody className="pt-25 px-12 gap-12">
                {isAuthenticated && (
                  <div className="flex gap-7 items-center mb-5">
                    <UserIcon size="16" />
                    <Text
                      color="tertiary"
                      className="text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {name}
                    </Text>
                  </div>
                )}
                <div className="flex flex-col gap-12">
                  <NavbarList
                    pathname={pathname}
                    options={getNavigationItemsHiddenByRole(userRole)}
                    onClose={onClose}
                  />

                  {isAuthenticated ? (
                    <LogoutButton size="xs">Logout</LogoutButton>
                  ) : (
                    <div className="flex flex-col gap-8">
                      <HeaderAuthButtons onPress={onClose} />
                    </div>
                  )}
                </div>
              </ModalBody>
            )}
          </ModalContent>
        </NavBarMobileBase>
      </div>
    </div>
  );
};
