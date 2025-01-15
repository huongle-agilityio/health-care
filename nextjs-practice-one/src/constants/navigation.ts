import { ROUTES } from './routes';

// Icons
import {
  CalendarIcon,
  ReviewIcon,
  HomeIcon,
  BlogIcon,
  SettingIcon,
  SchedulesIcon,
} from '@/ui/icons';

// Types
import { OptionMenu } from '@/types';

export const NAVIGATION_ITEMS: OptionMenu[] = [
  {
    url: ROUTES.HOME,
    title: 'Home',
    icon: HomeIcon,
  },
  {
    url: ROUTES.APPOINTMENTS,
    title: 'Appointments',
    icon: CalendarIcon,
  },
  {
    url: ROUTES.HEALTH_BLOG,
    title: 'Health Blog',
    icon: BlogIcon,
  },
  {
    url: ROUTES.REVIEWS,
    title: 'Review',
    icon: ReviewIcon,
  },
];

export const NAVIGATION_AUTHENTICATED = [
  {
    url: ROUTES.SCHEDULES,
    title: 'Schedules',
    icon: SchedulesIcon,
  },
];

export const NAVIGATION_ITEMS_WITH_LOGOUT = (
  action?: () => void,
): OptionMenu[] => [
  {
    title: 'Setting',
    url: ROUTES.SETTING,
    icon: SettingIcon,
  },
  {
    title: 'Logout',
    action: action,
  },
];
