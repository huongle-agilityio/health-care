import { SvgFactory, SvgFactoryProps } from './SvgFactory';

// Utils
import { cn } from '@/utils';

export const CalendarIcon = ({
  size = '12',
  className,
  ...props
}: SvgFactoryProps): JSX.Element => (
  <SvgFactory
    viewBox="0 0 24 24"
    size={size}
    className={cn('fill-primary-400', className)}
    {...props}
  >
    <path
      fill="currentColor"
      d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v4.025q0 .425-.288.713t-.712.287-.712-.288-.288-.712V10H5v10h6q.425 0 .713.288T12 21t-.288.713T11 22zm9-1v-1.65q0-.2.075-.387t.225-.338l5.225-5.2q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55-.1.563-.325.512l-5.2 5.2q-.15.15-.337.225T16.65 22H15q-.425 0-.712-.287T14 21m6.575-4.6.925-.975-.925-.925-.95.95z"
    />
  </SvgFactory>
);
