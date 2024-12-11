import { SvgFactory, SvgFactoryProps } from './SvgFactory';

// Utils
import { cn } from '@/utils';

export const ArrowRightIcon = ({
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
    <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
  </SvgFactory>
);
