import { memo } from 'react';
import { Card, Skeleton } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

export const BookingCardSkeleton = memo(() => (
  <Card
    className={cn(
      'w-full md:w-[230px] h-[168px] md:h-[275px]',
      'flex-row md:flex-col',
      'px-4 md:px-0 py-10 items-center gap-5 bg-background-200',
    )}
    radius="lg"
  >
    <Skeleton className="w-[75px] h-[75px] rounded-full">
      <div className="bg-default-300" />
    </Skeleton>
    <div className="w-4/5 md:w-[200px] pr-5 md:pr-0 space-y-10">
      <Skeleton className="h-[36px] rounded-lg">
        <div className="bg-default-200" />
      </Skeleton>
      <Skeleton className="h-[76px] rounded-lg">
        <div className="bg-default-200" />
      </Skeleton>
    </div>
  </Card>
));

BookingCardSkeleton.displayName = 'BookingCardSkeleton';
