import { SvgFactory, SvgFactoryProps } from './SvgFactory';

// Utils
import { cn } from '@/utils';

export const ReviewIcon = ({
  size = '12',
  className,
  ...props
}: SvgFactoryProps) => (
  <SvgFactory
    fill="none"
    viewBox="0 0 24 24"
    size={size}
    className={cn('stroke-primary-100', className)}
    {...props}
  >
    <path
      fill="currentColor"
      d="M6 14h3.05l5-5q.225-.225.338-.513t.112-.562-.125-.537-.325-.488l-.9-.95q-.225-.225-.5-.337t-.575-.113q-.275 0-.562.113T11 5.95l-5 5zm7-6.075L12.075 7zM7.5 12.5v-.95l2.525-2.525.5.45.45.5L8.45 12.5zm3.025-3.025.45.5-.95-.95zm.65 4.525H18v-2h-4.825zM2 22V4q0-.825.588-1.412T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18H6zm3.15-6H20V4H4v13.125zM4 16V4z"
    />
  </SvgFactory>
);