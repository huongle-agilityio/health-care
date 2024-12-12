'use client';

import Link from 'next/link';

// Constants
import { NAVIGATION_ITEMS, ROUTERS } from '@/constants';

// Components
import { Text } from '@/components';
import { HeaderAuth } from '../HeaderAuth';
import { NavBarMobile } from '../NavbarMobile';

// Icons
import { LogoIcon } from '@/icons';

// HOCs
import { withLogoutModal } from '@/hocs';

// Utils
import { cn } from '@/utils';

const MenuAuth = withLogoutModal(HeaderAuth);

export const Header = () => (
  <header className="sticky top-0 h-21 xl:h-[128px] border-b">
    <nav
      className={cn(
        'container mx-auto h-full',
        'flex items-center gap-[56px] justify-between xl:justify-start',
      )}
    >
      <NavBarMobile />
      <div className="flex gap-4 items-center">
        <Link href={ROUTERS.HOME}>
          <LogoIcon />
        </Link>
        <Text size="2xl" color="primary">
          CareMate
        </Text>
      </div>
      <div />

      <div className={cn('hidden xl:flex', 'w-full justify-between')}>
        <div className="flex gap-17 items-center">
          {NAVIGATION_ITEMS.map(({ url = '', title }, index) => (
            <Link key={`nav-${index}`} href={url}>
              <Text color="holder" className="hover:text-primary-100">
                {title}
              </Text>
            </Link>
          ))}
        </div>
        <MenuAuth />
      </div>
    </nav>
  </header>
);
