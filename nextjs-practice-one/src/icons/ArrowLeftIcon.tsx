import { SvgFactory, SvgFactoryProps } from './SvgFactory';

// Utils
import { cn } from '@/utils';

export const ArrowLeftIcon = ({
  size = '8',
  className,
  ...props
}: SvgFactoryProps) => (
  <SvgFactory
    viewBox="0 0 24 24"
    size={size}
    className={cn('fill-primary-400', className)}
    {...props}
  >
    <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
  </SvgFactory>
);
