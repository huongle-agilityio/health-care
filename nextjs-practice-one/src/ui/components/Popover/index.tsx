'use client';

import { memo, ReactNode } from 'react';
import {
  Popover as PopoverNextUI,
  PopoverProps as PopoverNextUIProps,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@heroui/react';

// Types
import { OptionMenu } from '@/types';

// Utils
import { PopoverItem } from './PopoverItem';

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

            return (
              <PopoverItem
                key={`popover-item-${index}`}
                title={title}
                action={action}
                url={url}
                isLastItem={isLastItem}
                onClose={onClose}
              />
            );
          })}
        </PopoverContent>
      </PopoverNextUI>
    );
  },
);

Popover.displayName = 'Popover';
