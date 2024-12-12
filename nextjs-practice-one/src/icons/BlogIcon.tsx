import { SvgFactory, SvgFactoryProps } from './SvgFactory';

// Utils
import { cn } from '@/utils';

export const BlogIcon = ({
  size = '12',
  className,
  ...props
}: SvgFactoryProps) => (
  <SvgFactory
    viewBox="0 0 24 24"
    size={size}
    className={cn('fill-primary-100', className)}
    {...props}
  >
    <path
      fill="currentColor"
      d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-2h10.5v-3.5H4zm12.5 0H20V9h-3.5zM4 12.5h10.5V9H4z"
    />
  </SvgFactory>
);
