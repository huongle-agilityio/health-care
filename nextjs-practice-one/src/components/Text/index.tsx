import { ReactNode } from 'react';

// Utils
import { cn } from '@/utils';

const TEXT_COLORS = {
  primary: 'text-primary-100',
  secondary: 'text-primary-200',
  tertiary: 'text-primary-300',
  light: 'text-primary-500',
  holder: 'text-primary-400',
  success: 'text-lime-600',
  error: 'text-red-400',
  warning: 'text-amber-400',
};

const TEXT_SIZES = {
  '3xs': 'text-3xs',
  '2xs': 'text-2xs',
  xs: 'text-xs',
  base: 'text-base',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

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
