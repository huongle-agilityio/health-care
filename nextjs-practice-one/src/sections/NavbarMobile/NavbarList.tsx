// Components
import { NavbarItem } from './NavbarItem';

// Types
import { OptionMenu } from '@/types';

interface NavbarListProps {
  pathname: string;
  options: OptionMenu[];
  onClose: () => void;
}

export const NavbarList = ({ pathname, options, onClose }: NavbarListProps) =>
  options.map(({ title, url, icon: Icon }, index) => (
    <NavbarItem
      key={`navbar-mobile-item-${index}`}
      pathname={pathname}
      title={title}
      url={url}
      icon={Icon}
      onClose={onClose}
    />
  ));
