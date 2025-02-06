'use client';

// Constants
import { NAVIGATION_ITEMS_WITH_LOGOUT } from '@/constants';

// Components
import { Image, Text } from '@/ui/components';
import { HeaderAuthButtons } from './HeaderAuthButtons';

// Icons
import { UserIcon } from '@/ui/icons';

// HOCs
import { withOptionsPopover } from '@/hocs';

// Utils
import { cn } from '@/utils';

interface HeaderAuthProps {
  isAuthenticated: boolean;
  avatar?: string;
  name?: string;
  // function handle logout
  onClick?: () => void;
}

const UserProfile = withOptionsPopover(UserIcon);
const UserProfileWithAvatar = withOptionsPopover(Image);

export const HeaderAuth = ({
  isAuthenticated,
  avatar,
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
        {avatar ? (
          <UserProfileWithAvatar
            src={avatar}
            alt={`${name}'s avatar`}
            menuOptions={NAVIGATION_ITEMS_WITH_LOGOUT(onClick)}
            sizes="(max-width: 768px) 32px"
            classNameWrapper={cn('rounded-full cursor-pointer', 'w-16 h-16')}
          />
        ) : (
          <UserProfile
            role="button"
            size="16"
            className="cursor-pointer"
            menuOptions={NAVIGATION_ITEMS_WITH_LOGOUT(onClick)}
          />
        )}
      </div>
    ) : (
      <HeaderAuthButtons />
    )}
  </div>
);
