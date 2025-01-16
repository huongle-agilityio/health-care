'use client';

// Constants
import { NAVIGATION_ITEMS_WITH_LOGOUT } from '@/constants';

// Components
import { HeaderAuthButtons } from './HeaderAuthButtons';

// Icons
import { UserIcon } from '@/ui/icons';

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
      <HeaderAuthButtons />
    )}
  </div>
);
