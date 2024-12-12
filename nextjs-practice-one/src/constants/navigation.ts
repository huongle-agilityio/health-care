import { ROUTERS } from './router';

// Icons
import {
  CalendarIcon,
  ReviewIcon,
  HomeIcon,
  BlogIcon,
  SettingIcon,
} from '@/icons';

// Types
import { OptionMenu } from '@/types';

export const NAVIGATION_ITEMS: OptionMenu[] = [
  {
    url: ROUTERS.HOME,
    title: 'Home',
    icon: HomeIcon,
  },
  {
    url: ROUTERS.APPOINTMENTS,
    title: 'Appointments',
    icon: CalendarIcon,
  },
  {
    url: ROUTERS.HEALTH_BLOG,
    title: 'Health Blog',
    icon: BlogIcon,
  },
  {
    url: ROUTERS.REVIEWS,
    title: 'Review',
    icon: ReviewIcon,
  },
];

export const NAVIGATION_ITEMS_WITH_LOGOUT = (
  action?: () => void,
): OptionMenu[] => [
  {
    title: 'Setting',
    url: ROUTERS.SETTING,
    icon: SettingIcon,
  },
  {
    title: 'Logout',
    action: action,
  },
];
