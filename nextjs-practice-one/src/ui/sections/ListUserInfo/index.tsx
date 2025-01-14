import { memo } from 'react';

// Components
import { Skeleton, Text } from '@/ui/components';

// Utils
import { formatUserInfo } from '@/utils';

// Types
import { User } from '@/types';

export const ListUserInfo = memo(
  ({ name, phone, email }: Pick<User, 'email' | 'name' | 'phone'>) => {
    const userInfo = formatUserInfo({
      name,
      phone,
      email,
    });

    return userInfo.map(({ title, value }, index) => (
      <div className="flex gap-8" key={`user-info-${index}`}>
        <Text color="tertiary" size="xl">
          {title}:
        </Text>

        {value ? (
          <Text color="holder" size="xl">
            {value}
          </Text>
        ) : (
          <Skeleton className="h-16 w-4/5 rounded-lg" />
        )}
      </div>
    ));
  },
);

ListUserInfo.displayName = 'ListUserInfo';
