import { ComponentType, memo } from 'react';
import Link from 'next/link';

// Icons
import { SvgFactoryProps } from '@/icons';

// Utils
import { cn } from '@/utils';

interface NavbarItemProps {
  pathname: string;
  title: string;
  url?: string;
  icon?: ComponentType<SvgFactoryProps>;
  onClose: () => void;
}

export const NavbarItem = memo(
  ({ pathname, title, url, icon: Icon, onClose }: NavbarItemProps) =>
    url ? (
      <Link
        href={url}
        className={cn(
          'py-5 px-6 cursor-pointer',
          'flex items-center gap-8 rounded-xl',
          { 'bg-secondary-100': pathname === url },
        )}
        onClick={onClose}
      >
        {Icon && <Icon className="stroke-primary-100" />}

        <div className="text-center">{title}</div>
      </Link>
    ) : (
      <div
        className={cn(
          'py-5 px-6 cursor-pointer',
          'flex items-center gap-8 rounded-xl',
          { 'bg-secondary-100': pathname === url },
        )}
        onClick={onClose}
      >
        {Icon && <Icon className="stroke-primary-100" />}

        <div className="text-center">{title}</div>
      </div>
    ),
);

NavbarItem.displayName = 'NavbarItem';
