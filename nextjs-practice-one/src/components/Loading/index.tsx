import { Spinner, SpinnerProps } from '@nextui-org/react';

export const Loading = ({
  label = 'Loading...',
  color = 'current',
  ...props
}: SpinnerProps) => (
  <Spinner
    label={label}
    color={color}
    classNames={{
      circle1: 'w-[40px] h-[40px] left-6',
      circle2: 'w-[40px] h-[40px] left-6',
      base: 'w-[80px] h-[80px]',
      wrapper: 'w-[80px] h-[80px]',
      label: 'text-primary-100',
    }}
    {...props}
  />
);
