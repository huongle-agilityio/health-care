import { Skeleton } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

export const TimeSlotsSkeleton = () => (
  <div className="flex flex-col gap-6">
    <Skeleton className={cn('rounded-xl', 'w-[110px] h-[20px]')}>
      <div className="bg-default-300" />
    </Skeleton>
    <Skeleton className={cn('rounded-xl', 'w-[110px] h-[20px]')}>
      <div className="bg-default-300" />
    </Skeleton>
    <Skeleton className={cn('rounded-xl', 'w-[110px] h-[20px]')}>
      <div className="bg-default-300" />
    </Skeleton>
  </div>
);
