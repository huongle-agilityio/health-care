'use client';

import Link from 'next/link';

// Constants
import { NAVIGATION_ITEMS_WITH_LOGOUT, ROUTERS } from '@/constants';

// Components
import { Button } from '@/components';

// Icons
import { UserIcon } from '@/icons';

// HOCs
import { withOptionsPopover } from '@/hocs';

interface HeaderAuthProps {
  isAuthenticated: boolean;
  // function handle logout
  onClick?: () => void;
}

const UserProfile = withOptionsPopover(UserIcon);

export const HeaderAuth = ({ isAuthenticated, onClick }: HeaderAuthProps) => (
  <div className="flex gap-8">
    {isAuthenticated ? (
      <UserProfile
        role="button"
        size="16"
        className="cursor-pointer"
        menuOptions={NAVIGATION_ITEMS_WITH_LOGOUT(onClick)}
      />
    ) : (
      <>
        <Link href={ROUTERS.LOGIN}>
          <Button size="xs" variant="bordered" color="bordered">
            Login
          </Button>
        </Link>
        <Link href={ROUTERS.REGISTER}>
          <Button size="xs">Register</Button>
        </Link>
      </>
    )}
  </div>
);
