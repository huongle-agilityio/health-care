import { Skeleton } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

export const TimeSlotsSkeleton = () => (
  <div className="flex flex-col gap-6 w-full">
    {Array.from({ length: 3 }, (_, index) => (
      <Skeleton
        key={`time-slot-skeleton-${index}`}
        className={cn('rounded-xl', 'w-full xl:w-[90px] h-[20px]')}
      />
    ))}
  </div>
);
