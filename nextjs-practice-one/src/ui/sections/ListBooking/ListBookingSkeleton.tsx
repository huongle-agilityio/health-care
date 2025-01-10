// Components
import { BookingCardSkeleton } from '@/ui/components';

export const ListBookingSkeleton = () =>
  Array.from({ length: 5 }, (_, index) => (
    <BookingCardSkeleton key={`list-booking-skeleton-${index}`} />
  ));
