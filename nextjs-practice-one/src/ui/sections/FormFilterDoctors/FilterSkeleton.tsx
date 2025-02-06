// Components
import { Button, SelectSkeleton } from '@/ui/components';

// Utils
import { cn } from '@/utils';

export const SkeletonFilter = () => (
  <div
    className={cn(
      'flex gap-8 2xl:gap-22 flex-col 2xl:flex-row',
      'justify-start 2xl:justify-center',
      'items-start 2xl:items-end',
      'h-fit 2xl:h-[96px]',
    )}
  >
    <div className="flex flex-row gap-8 2xl:gap-14 w-full 2xl:w-fit">
      {Array.from({ length: 2 }, (_, index) => (
        <div
          key={`skeleton-filter-${index}`}
          className="flex flex-col 2xl:flex-row gap-14 2xl:gap-14 w-full"
        >
          <SelectSkeleton
            classNameLabel="w-full 2xl:w-[200px]"
            classNameSelect="w-full 2xl:w-[200px]"
          />
          <SelectSkeleton
            classNameLabel="w-full 2xl:w-[200px]"
            classNameSelect="w-full 2xl:w-[200px]"
          />
        </div>
      ))}
    </div>
    <div className="flex flex-col 2xl:flex-row gap-8 2xl:gap-21 w-full 2xl:w-[352px]">
      <Button isLoading>Search</Button>
      <Button isDisabled color="primary">
        Reset
      </Button>
    </div>
  </div>
);
