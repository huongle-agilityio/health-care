'use client';

import {
  extendVariants,
  ModalBody,
  ModalContent,
  Modal as ModalNextUI,
  useDisclosure,
} from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAVIGATION_ITEMS, ROUTERS } from '@/constants';

// Components
import { Button } from '@/components';
import { NavbarListItem } from './NavbarListItem';

// Icons
import { CloseIcon, OutlineBurgerIcon, SettingIcon } from '@/icons';

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

export const NavBarMobile = () => {
  const pathname = usePathname();
  const { isOpen, onOpenChange } = useDisclosure();

  // TODO: Will update feature authentication
  const isAuthenticated = true;

  const options = isAuthenticated
    ? [
        ...NAVIGATION_ITEMS,
        {
          title: 'Setting',
          url: ROUTERS.SETTING,
          icon: SettingIcon,
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
      <div className="lg:hidden">
        <NavBarMobileBase
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          closeButton={<CloseIcon size="17" />}
        >
          <ModalContent>
            {(onClose) => (
              <ModalBody className="pt-25 px-12 gap-12">
                <div className="flex flex-col gap-12">
                  <NavbarListItem
                    pathname={pathname}
                    options={options}
                    onClose={onClose}
                  />

                  {isAuthenticated ? (
                    <LogoutButton size="xs">Logout</LogoutButton>
                  ) : (
                    <div className="flex flex-col gap-8">
                      <Link href={ROUTERS.LOGIN}>
                        <Button
                          size="xs"
                          variant="bordered"
                          color="bordered"
                          onClick={onClose}
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href={ROUTERS.REGISTER}>
                        <Button size="xs" onClick={onClose}>
                          Register
                        </Button>
                      </Link>
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
