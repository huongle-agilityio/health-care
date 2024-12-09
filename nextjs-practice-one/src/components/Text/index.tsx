import { ReactNode } from 'react';

// Constants
import { TEXT_COLORS, TEXT_SIZES } from '@/constants';

// Utils
import { cn } from '@/utils';

interface TextProps {
  color?: keyof typeof TEXT_COLORS;
  size?: keyof typeof TEXT_SIZES;
  variants?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  children: ReactNode;
}

export const Text = ({
  color = 'light',
  size = 'base',
  className,
  variants = 'p',
  children,
  ...props
}: TextProps) => {
  const TagName = variants;

  return (
    <TagName
      className={cn(TEXT_COLORS[color], TEXT_SIZES[size], className)}
      {...props}
    >
      {children}
    </TagName>
  );
};
