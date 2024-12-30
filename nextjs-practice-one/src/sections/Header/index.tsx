'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { usePathname } from 'next/navigation';

// Constants
import { COOKIES_KEYS, NAVIGATION_ITEMS, ROUTERS } from '@/constants';

// Components
import { Text } from '@/components';
import { HeaderAuth } from '../HeaderAuth';
import { NavBarMobile } from '../NavbarMobile';

// Icons
import { LogoIcon } from '@/icons';

// HOCs
import { withLogoutModal } from '@/hocs';

// Stores
import { useUserStore } from '@/stores';

// Utils
import { cn } from '@/utils';

const MenuAuth = withLogoutModal(HeaderAuth);

export const Header = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const pathname = usePathname();
  const { setAuthenticated } = useUserStore();

  useEffect(() => {
    const cookies = new Cookies();
    setAuthenticated(cookies.get(COOKIES_KEYS.TOKEN));
  }, [setAuthenticated]);

  return (
    <header
      className={cn(
        'sticky top-0 h-21 xl:h-[128px] z-20',
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
          href={ROUTERS.HOME}
          className="flex gap-4 items-center m-auto lg:m-0"
        >
          <LogoIcon />
          <Text size="2xl" color="primary">
            CareMate
          </Text>
        </Link>

        <div className={cn('hidden xl:flex', 'w-full justify-between')}>
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
