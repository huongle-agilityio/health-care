// Components
import { CardSkeleton, Skeleton } from '@/ui/components';

export const ListDoctorsAvailableSkeleton = () => (
  <>
    <div className="flex flex-col pt-[330px] 2xl:pt-[120px] pb-20 items-center gap-5">
      <Skeleton className="w-2/3 h-[70px]  rounded-sm" />
      <Skeleton className="w-2/3 h-[32px] rounded-sm" />
    </div>
    <div className="flex flex-wrap gap-x-8 gap-y-20 justify-center mt-5">
      {Array.from({ length: 6 }, (_, index) => (
        <CardSkeleton key={`card-doctor-skeleton-${index}`} />
      ))}
    </div>
  </>
);
