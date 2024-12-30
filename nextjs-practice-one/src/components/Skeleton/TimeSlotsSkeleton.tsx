import { Skeleton } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

export const TimeSlotsSkeleton = () => (
  <div className="flex flex-col gap-6 w-full">
    <Skeleton className={cn('rounded-xl', 'w-full xl:w-[110px] h-[20px]')}>
      <div className="bg-default-300" />
    </Skeleton>
    <Skeleton className={cn('rounded-xl', 'w-full xl:w-[110px] h-[20px]')}>
      <div className="bg-default-300" />
    </Skeleton>
    <Skeleton className={cn('rounded-xl', 'w-full xl:w-[110px] h-[20px]')}>
      <div className="bg-default-300" />
    </Skeleton>
  </div>
);
