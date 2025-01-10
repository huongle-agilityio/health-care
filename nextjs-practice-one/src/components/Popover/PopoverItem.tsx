import { memo } from 'react';
import Link from 'next/link';

// Utils
import { cn } from '@/utils';

interface PopoverItemProps {
  url?: string;
  isLastItem?: boolean;
  title: string;
  action?: () => void;
  onClose: () => void;
}

export const PopoverItem = memo(
  ({ title, isLastItem, action, url, onClose }: PopoverItemProps) => {
    const handleAction = () => {
      action?.();
      onClose();
    };

    return url ? (
      <Link
        href={url}
        className={cn(
          'text-center',
          'px-6 py-6 hover:bg-secondary-400 w-full',
          isLastItem ? 'rounded-b-sm' : 'rounded-t-sm',
        )}
        onClick={handleAction}
      >
        {title}
      </Link>
    ) : (
      <div
        className={cn(
          'text-center cursor-pointer',
          'px-6 py-6 hover:bg-secondary-400 w-full',
          isLastItem ? 'rounded-b-sm' : 'rounded-t-sm',
        )}
        onClick={handleAction}
      >
        {title}
      </div>
    );
  },
);

PopoverItem.displayName = 'PopoverItem';
