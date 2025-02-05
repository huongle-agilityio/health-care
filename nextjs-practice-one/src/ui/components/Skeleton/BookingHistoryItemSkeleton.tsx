// Components
import { Skeleton } from './Skeleton';

// Utils
import { cn } from '@/utils';

export const BookingHistoryItemSkeleton = () => (
  <>
    {/* Booking History Item web */}
    <div
      className={cn(
        'p-10',
        'hidden md:flex gap-5',
        'border-b-1 border-secondary-200',
      )}
    >
      <div className="flex flex-[2_2_0%] items-center gap-5">
        <Skeleton className="w-[45px] h-[45px] rounded-full" />

        <div className="w-11/12">
          <Skeleton className="h-[45px] rounded-md" />
        </div>
      </div>
    </div>

    {/* Booking History Item mobile */}
    <div
      className={cn(
        'p-10',
        'flex md:hidden gap-5',
        'border-b-1 border-secondary-200',
      )}
    >
      <div className="w-full flex gap-5 items-center">
        <Skeleton className="w-[45px] h-[45px] rounded-full" />
        <div className="w-10/12 flex flex-col gap-2">
          <Skeleton className="h-[120px] rounded-md" />
        </div>
      </div>
    </div>
  </>
);
