import { Card, Skeleton } from '@nextui-org/react';

// Utils
import { cn } from '@/utils';

export const CardSkeleton = () => (
  <Card
    className={cn(
      'py-10 lg:py-17 px-12 lg:px-0',
      'w-full lg:w-[430px] lg:h-[508px] bg-background-200',
      'flex-row lg:flex-col items-center gap-5 ',
    )}
    radius="lg"
  >
    <Skeleton
      className={cn(
        'w-[75px] h-[75px]',
        'lg:w-[150px] lg:h-[150px]',
        'rounded-full',
      )}
    >
      <div className="bg-default-300" />
    </Skeleton>
    <div className="w-[255px] space-y-10 lg:pt-[27px]">
      <div className="lg:pb-15 flex-col space-y-5">
        <Skeleton className="hidden lg:block h-[36px] rounded-lg">
          <div className="bg-default-200" />
        </Skeleton>
        <Skeleton className="h-[80px] rounded-lg">
          <div className="bg-default-200" />
        </Skeleton>
      </div>

      <Skeleton className="h-[60px] rounded-lg">
        <div className="bg-default-200" />
      </Skeleton>
    </div>
  </Card>
);
