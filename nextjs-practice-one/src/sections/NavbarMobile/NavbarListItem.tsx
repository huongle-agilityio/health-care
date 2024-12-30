import Link from 'next/link';

// Utils
import { cn } from '@/utils';

// Types
import { OptionMenu } from '@/types';

interface NavbarMobileItemProps {
  pathname: string;
  options: OptionMenu[];
  onClose: () => void;
}

export const NavbarListItem = ({
  pathname,
  options,
  onClose,
}: NavbarMobileItemProps) =>
  options.map(({ title, url, icon: Icon }, index) =>
    url ? (
      <Link
        key={`${title}-${index}`}
        href={url}
        className={cn(
          'py-5 px-6 cursor-pointer',
          'flex items-center gap-8 rounded-xl',
          { 'bg-secondary-100': pathname === url },
        )}
        onClick={onClose}
      >
        {Icon && <Icon />}

        <div className="text-center">{title}</div>
      </Link>
    ) : (
      <div
        key={`${title}-${index}`}
        className={cn(
          'py-5 px-6 cursor-pointer',
          'flex items-center gap-8 rounded-xl',
          { 'bg-secondary-100': pathname === url },
        )}
        onClick={onClose}
      >
        {Icon && <Icon className="fill-primary-100 stroke-primary-100" />}

        <div className="text-center">{title}</div>
      </div>
    ),
  );
