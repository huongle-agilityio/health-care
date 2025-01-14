// Components
import { Skeleton } from './Skeleton';

// Utils
import { cn } from '@/utils';

interface SelectSkeletonProps {
  classNameLabel?: string;
  classNameSelect?: string;
}

export const SelectSkeleton = ({
  classNameSelect,
  classNameLabel,
}: SelectSkeletonProps) => (
  <div className="flex flex-col gap-[16px]">
    <Skeleton
      className={cn('rounded-xl', 'w-[197px] h-[20px]', classNameLabel)}
    />
    <Skeleton
      className={cn('rounded-xl', 'w-[197px] h-[60px]', classNameSelect)}
    />
  </div>
);
