import { SvgFactory, SvgFactoryProps } from './SvgFactory';

// Utils
import { cn } from '@/utils';

export const UpComingIcon = ({
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
    <path d="M15 22v-2h4V10H5v4H3V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm-7 2-1.4-1.4L9.175 20H1v-2h8.175L6.6 15.4 8 14l5 5z" />
  </SvgFactory>
);
