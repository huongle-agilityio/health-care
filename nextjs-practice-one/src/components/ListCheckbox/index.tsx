'use client';

import { ChangeEvent } from 'react';
import { Checkbox } from '@nextui-org/react';

// Components
import { Text } from '../Text';

// Types
import { OptionCheckBox } from '@/types';

// Utils
import { cn } from '@/utils';

export const ListCheckbox = ({
  options,
  selectedValue,
  error,
  onChange,
  className,
}: {
  error?: string;
  className?: string;
  selectedValue: string;
  options: OptionCheckBox[];
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex flex-col gap-4">
    <div className={cn('flex flex-col gap-6', className)}>
      {options.map(({ value, label, isDisabled }) => (
        <Checkbox
          isDisabled={isDisabled}
          size="lg"
          key={`option-${value}`}
          value={value}
          isSelected={selectedValue === value}
          onChange={onChange}
          classNames={{
            wrapper: 'w-10 h-10',
            icon: 'bg-blue-500 h-full w-full p-1',
          }}
        >
          {label}
        </Checkbox>
      ))}
    </div>
    {error && (
      <Text size="xs" color="error">
        {error}
      </Text>
    )}
  </div>
);
