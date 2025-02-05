// Components
import { BookingHistoryItemSkeleton, Skeleton } from '@/ui/components';

export const BookingHistorySkeleton = () => (
  <div className="w-full flex flex-col">
    <Skeleton className="w-1/2 h-[32px] rounded-md" />
    {Array.from({ length: 5 }, (_, index) => (
      <BookingHistoryItemSkeleton key={`list-booking-skeleton-${index}`} />
    ))}
  </div>
);
