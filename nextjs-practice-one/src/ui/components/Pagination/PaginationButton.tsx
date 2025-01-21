import { memo } from 'react';

// Components
import { Button } from '../Button';

// Icons
import { ArrowLeftIcon, ArrowRightIcon } from '@/ui/icons';

// Utils
import { cn } from '@/utils';

interface PaginationButtonProps {
  isVisible: boolean;
  isNextButton?: boolean;
  onPress: () => void;
}

export const PaginationButton = memo(
  ({ isVisible, isNextButton = false, onPress }: PaginationButtonProps) => (
    <Button
      size="none"
      color="bordered"
      variant="bordered"
      className={cn('text-primary-400 hover:text-primary-100 border-0', {
        invisible: !isVisible,
      })}
      onPress={onPress}
    >
      {isNextButton ? (
        <>
          Next <ArrowRightIcon className="group-hover:fill-primary-100" />
        </>
      ) : (
        <>
          <ArrowLeftIcon className="group-hover:fill-primary-100" /> Previous
        </>
      )}
    </Button>
  ),
);

PaginationButton.displayName = 'PaginationButton';
