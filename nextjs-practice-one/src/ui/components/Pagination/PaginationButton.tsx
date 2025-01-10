import { memo } from 'react';

// Components
import { Button } from '../Button';

// Icons
import { ArrowLeftIcon, ArrowRightIcon } from '@/ui/icons';

interface PaginationButtonProps {
  isNextButton?: boolean;
  onPress: () => void;
}

export const PaginationButton = memo(
  ({ onPress, isNextButton = false }: PaginationButtonProps) => (
    <Button
      size="none"
      color="bordered"
      variant="bordered"
      className="group text-primary-400 hover:text-primary-100 border-0"
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
