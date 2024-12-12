import { ComponentType } from 'react';

// Icons
import { SvgFactoryProps } from '@/icons/SvgFactory';

export type CustomClassType = {
  customClass?: string;
};

export type PageErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// Select
export interface Option {
  value: string;
  label: string;
}

// Popover
export interface OptionMenu {
  title: string;
  url?: string;
  action?: () => void;
  icon?: ComponentType<SvgFactoryProps>;
}
