'use client';

import { memo, ReactNode } from 'react';
import Link from 'next/link';
import {
  Popover as PopoverNextUI,
  PopoverProps as PopoverNextUIProps,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@nextui-org/react';

// Types
import { OptionMenu } from '@/types';

// Utils
import { cn } from '@/utils';

export interface PopoverProps {
  placement?: PopoverNextUIProps['placement'];
  menuOptions: OptionMenu[];
  children: ReactNode;
}

export const Popover = memo(
  ({ children, placement, menuOptions, ...props }: PopoverProps) => {
    const { isOpen, onClose, onOpenChange } = useDisclosure();

    return (
      <PopoverNextUI
        isOpen={isOpen}
        placement={placement}
        onOpenChange={onOpenChange}
        {...props}
      >
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent className="mt-1 p-0 rounded-sm min-w-[100px]">
          {menuOptions.map(({ title, action, url }, index) => {
            const isLastItem = index + 1 === menuOptions.length;
            const handleAction = () => {
              action?.();
              onClose();
            };

            return url ? (
              <Link
                key={`${title}-${index}`}
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
                key={`${title}-${index}`}
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
          })}
        </PopoverContent>
      </PopoverNextUI>
    );
  },
);

Popover.displayName = 'Popover';
