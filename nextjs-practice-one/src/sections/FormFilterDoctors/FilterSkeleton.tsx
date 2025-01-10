// Components
import { SelectSkeleton } from '@/components';

export const SkeletonFilter = () => (
  <div className="flex flex-row gap-8 2xl:gap-21 w-full 2xl:w-fit">
    {Array.from({ length: 2 }, (_, index) => (
      <div
        key={`skeleton-filter-${index}`}
        className="flex flex-col 2xl:flex-row gap-14 2xl:gap-21 w-full"
      >
        <SelectSkeleton
          classNameLabel="w-full 2xl:w-[180px]"
          classNameSelect="w-full 2xl:w-[180px]"
        />
        <SelectSkeleton
          classNameLabel="w-full 2xl:w-[180px]"
          classNameSelect="w-full 2xl:w-[180px]"
        />
      </div>
    ))}
  </div>
);
