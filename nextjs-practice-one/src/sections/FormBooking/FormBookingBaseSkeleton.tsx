import { Skeleton } from '@nextui-org/react';

// Components
import { TimeSlotsSkeleton } from '@/components';

// Utils
import { cn } from '@/utils';

export const FormBookingSkeleton = () => (
  <div className="p-10 xl:p-25 rounded-xl shadow-xl">
    <div className="flex flex-col xl:flex-row gap-10 xl:gap-25 items-center justify-center">
      <div className="flex gap-15">
        <div className="flex flex-col items-center justify-center">
          <Skeleton
            className={cn(
              'rounded-full',
              'w-[75px] h-[75px]',
              'md:w-[150px] md:h-[150px]',
            )}
          />
        </div>
        <div className="flex flex-col gap-15 pt-10 w-[185px] h-[185px]">
          <Skeleton className="w-full h-full" />
        </div>
      </div>

      <div
        className={'flex flex-col xl:flex-row gap-10 xl:gap-22 items-center'}
      >
        <Skeleton className="w-[310px] h-[324px]" />
        <div className="h-[150px] xl:h-fit flex items-center xl:self-start px-8 xl:px-0 w-full xl:w-fit">
          <TimeSlotsSkeleton />
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-10 mt-4">
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={`input-skeleton-${index}`} className="w-full h-[70px]" />
      ))}
      <div className="flex flex-col mt-20 gap-15">
        <Skeleton className="w-full h-[60px]" />
        <Skeleton className="w-full h-[60px]" />
      </div>
    </div>
  </div>
);
