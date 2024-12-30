'use client';

import { memo } from 'react';
import { Skeleton } from '@nextui-org/react';

// Components
import { Text } from '@/components';

// Stores
import { useUserStore } from '@/stores';

// Utils
import { formatUserInfo } from '@/utils';

export const ListUserInfo = memo(() => {
  const { user } = useUserStore();

  const userInfo = formatUserInfo({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
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
});

ListUserInfo.displayName = 'ListUserInfo';
