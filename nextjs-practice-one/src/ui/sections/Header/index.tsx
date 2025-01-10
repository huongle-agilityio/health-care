'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Constants
import {
  NAVIGATION_ITEMS,
  ROUTES,
  STYLE_HEADER_HEIGHT_DESKTOP,
  STYLE_HEADER_HEIGHT_MOBILE,
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

export const Header = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
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
        <NavBarMobile isAuthenticated={isAuthenticated} />
        <Link
          href={ROUTES.HOME}
          className="flex gap-4 items-center m-auto lg:m-0"
        >
          <LogoIcon />
          <Text size="2xl" color="primary">
            CareMate
          </Text>
        </Link>

        <div className={cn('hidden lg:flex', 'w-full justify-between')}>
          <div className="flex gap-17 items-center">
            {NAVIGATION_ITEMS.map(({ url = '', title }, index) => {
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
            })}
          </div>
          <MenuAuth isAuthenticated={isAuthenticated} />
        </div>
      </nav>
    </header>
  );
};
