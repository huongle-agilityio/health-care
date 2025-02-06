'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Constants
import {
  getNavigationItemsHiddenByRole,
  ROUTES,
  STYLE_HEADER_HEIGHT_DESKTOP,
  STYLE_HEADER_HEIGHT_MOBILE,
  USER_ROLE,
} from '@/constants';

// Components
import { Text } from '@/ui/components';
import { HeaderAuth } from '../HeaderAuth';
import { NavBarMobile } from '../NavbarMobile';

// Icons
import { LogoIcon } from '@/ui/icons';

// HOCs
import { withLogoutModal } from '@/hocs';

// Utils
import { cn } from '@/utils';

const MenuAuth = withLogoutModal(HeaderAuth);

interface HeaderProps {
  name?: string;
  avatar?: string;
  userRole?: USER_ROLE;
}

export const Header = ({ name, avatar, userRole }: HeaderProps) => {
  const isAuthenticated = !!name;
  const pathname = usePathname();

  return (
    <header
      className={cn(
        `${STYLE_HEADER_HEIGHT_DESKTOP} ${STYLE_HEADER_HEIGHT_MOBILE}`,
        'sticky top-0 z-20',
        'border-b bg-background-100',
      )}
    >
      <nav
        className={cn(
          'relative',
          'container mx-auto h-full',
          'flex items-center gap-[56px] xl:justify-start',
        )}
      >
        <NavBarMobile
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          name={name}
          avatar={avatar}
        />
        <Link
          href={ROUTES.HOME}
          className="flex gap-4 items-center m-auto xl:m-0"
        >
          <LogoIcon />
          <Text size="2xl" color="primary">
            CareMate
          </Text>
        </Link>

        <div className={cn('hidden xl:flex', 'w-full justify-between')}>
          <div className="flex gap-17 items-center">
            {getNavigationItemsHiddenByRole(userRole).map(
              ({ url = '', title }, index) => {
                const isActive = url === pathname;

                return (
                  <Link key={`nav-${index}`} href={url}>
                    <Text
                      color={isActive ? 'primary' : 'holder'}
                      className="hover:text-primary-100"
                    >
                      {title}
                    </Text>
                  </Link>
                );
              },
            )}
          </div>
          <MenuAuth
            avatar={avatar}
            isAuthenticated={isAuthenticated}
            name={name}
          />
        </div>
      </nav>
    </header>
  );
};
