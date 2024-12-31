import { memo } from 'react';

// Icons
import { StartIcon, OutlineStartIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

interface RatingProps {
  value: number;
  max?: number;
  className?: string;
}

export const Rating = memo(({ value, max = 5, className }: RatingProps) => (
  <div className={cn('flex items-center gap-2', className)}>
    {Array.from({ length: Math.round(max) }, (_, index) =>
      index < Math.round(value) ? (
        <StartIcon key={index} data-testid="star-icon" />
      ) : (
        <OutlineStartIcon key={index} data-testid="outlined-star-icon" />
      ),
    )}
  </div>
));

Rating.displayName = 'Rating';
