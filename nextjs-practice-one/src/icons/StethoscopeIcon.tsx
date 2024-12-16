import { SvgFactory, SvgFactoryProps } from './SvgFactory';

// Utils
import { cn } from '@/utils';

export const StethoscopeIcon = ({
  size = '9',
  className,
  ...props
}: SvgFactoryProps) => (
  <SvgFactory
    viewBox="0 0 24 24"
    size={size}
    className={cn('fill-primary-400', className)}
    {...props}
  >
    <path d="M8 3v2H6v4a4 4 0 0 0 8 0V5h-2V3h3a1 1 0 0 1 1 1v5a6 6 0 0 1-5 5.917V16.5a3.5 3.5 0 0 0 6.775 1.238 3 3 0 1 1 2.05.148A5.502 5.502 0 0 1 8.999 16.5v-1.583A6 6 0 0 1 4 9V4a1 1 0 0 1 1-1z" />
  </SvgFactory>
);