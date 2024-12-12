import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Utils
import { cn } from '@/utils';

// Types
import { OptionMenu } from '@/types';

interface NavbarMobileItemProps {
  options: OptionMenu[];
  onClose: () => void;
}

export const NavbarListItem = ({ options, onClose }: NavbarMobileItemProps) => {
  const pathname = usePathname();

  return options.map(({ title, url, icon: Icon, action }, index) => (
    <div
      key={`${title}-${index}`}
      className={cn(
        'py-5 px-6 cursor-pointer',
        'flex items-center gap-8 rounded-xl',
        { 'bg-secondary-100': pathname === url },
      )}
      onClick={onClose}
    >
      {Icon && <Icon />}

      {url ? (
        <Link href={url} className="text-center">
          {title}
        </Link>
      ) : (
        <div className="text-center" onClick={action}>
          {title}
        </div>
      )}
    </div>
  ));
};
