import { SvgFactory, SvgFactoryProps } from './SvgFactory';

// Utils
import { cn } from '@/utils';

export const HourglassIcon = ({
  size = '9',
  className,
  ...props
}: SvgFactoryProps) => (
  <SvgFactory
    viewBox="0 0 20 20"
    size={size}
    className={cn('fill-primary-400', className)}
    {...props}
  >
    <g>
      <path
        fillRule="evenodd"
        d="M7.203 4c.13.819.323 1.595.575 2.084.198.385.586.874 1.118 1.407.365.365.752.706 1.104.996.352-.29.74-.631 1.104-.996.532-.533.92-1.022 1.118-1.407.252-.489.444-1.265.575-2.084zm-.662-2c-.844 0-1.518.697-1.42 1.536C5.246 4.612 5.499 6.026 6 7c.672 1.305 2.218 2.643 3.18 3.393.485.38 1.155.38 1.64 0C11.783 9.643 13.329 8.305 14 7c.501-.973.754-2.388.88-3.464.097-.84-.577-1.536-1.421-1.536z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M12.797 16c-.13-.819-.323-1.595-.575-2.084-.198-.385-.586-.875-1.118-1.407A16 16 0 0 0 10 11.513c-.352.29-.74.631-1.104.996-.532.532-.92 1.022-1.118 1.407-.252.489-.444 1.265-.575 2.084zm.662 2c.844 0 1.518-.697 1.42-1.535-.125-1.077-.378-2.492-.879-3.465-.672-1.305-2.218-2.643-3.18-3.393a1.326 1.326 0 0 0-1.64 0C8.217 10.357 6.672 11.695 6 13c-.501.973-.754 2.388-.88 3.465-.097.838.577 1.535 1.421 1.535z"
        clipRule="evenodd"
      />
      <path d="M7 15.75s2-1.5 3-1.5 3 1.5 3 1.5v.5H7z" />
      <path
        fillRule="evenodd"
        d="M4 2.5a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 15a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1"
        clipRule="evenodd"
      />
    </g>
  </SvgFactory>
);
