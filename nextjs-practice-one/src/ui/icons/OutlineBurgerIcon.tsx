import { SvgFactory, SvgFactoryProps } from './SvgFactory';

// Utils
import { cn } from '@/utils';

export const OutlineBurgerIcon = ({
  size = '9',
  className,
  ...props
}: SvgFactoryProps) => (
  <SvgFactory
    fill="none"
    viewBox="0 0 14 14"
    size={size}
    className={cn('stroke-primary-100', className)}
    {...props}
  >
    <circle cx={7} cy={7} r={6.5} />
    <path d="M4.5 4.5h5M4.5 7h5m-5 2.5h5" />
  </SvgFactory>
);
