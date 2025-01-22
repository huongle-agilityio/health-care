'use client';

// Constants
import { NAVIGATION_ITEMS_WITH_LOGOUT } from '@/constants';

// Components
import { Text } from '@/ui/components';
import { HeaderAuthButtons } from './HeaderAuthButtons';

// Icons
import { UserIcon } from '@/ui/icons';

// HOCs
import { withOptionsPopover } from '@/hocs';

interface HeaderAuthProps {
  isAuthenticated: boolean;
  name?: string;
  // function handle logout
  onClick?: () => void;
}

const UserProfile = withOptionsPopover(UserIcon);

export const HeaderAuth = ({
  isAuthenticated,
  name,
  onClick,
}: HeaderAuthProps) => (
  <div className="flex gap-8">
    {isAuthenticated ? (
      <div className="flex gap-7 items-center">
        <Text
          color="tertiary"
          className="max-w-[100px] text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {name}
        </Text>
        <UserProfile
          role="button"
          size="16"
          className="cursor-pointer"
          menuOptions={NAVIGATION_ITEMS_WITH_LOGOUT(onClick)}
        />
      </div>
    ) : (
      <HeaderAuthButtons />
    )}
  </div>
);
