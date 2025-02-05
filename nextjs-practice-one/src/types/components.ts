import { ComponentType } from 'react';

// Icons
import { SvgFactoryProps } from '@/ui/icons';

export type CustomClassType = {
  customClass?: string;
};

export type PageErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// Select
export interface Option {
  value: string | number;
  label: string;
}

export interface OptionCheckBox extends Option {
  isDisabled: boolean;
}

// Popover
export interface OptionMenu {
  title: string;
  url?: string;
  hidden?: string[];
  action?: () => void;
  icon?: ComponentType<SvgFactoryProps>;
}

export interface ListInfo {
  title: string;
  value: string;
}
