import { USER_ROLE } from './auth';
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
    hidden: [],
  },
  {
    url: ROUTES.APPOINTMENTS,
    title: 'Appointments',
    icon: CalendarIcon,
    hidden: [],
  },
  {
    url: ROUTES.HEALTH_BLOG,
    title: 'Health Blog',
    icon: BlogIcon,
    hidden: [],
  },
  {
    url: ROUTES.REVIEWS,
    title: 'Review',
    icon: ReviewIcon,
    hidden: [],
  },
  {
    url: ROUTES.SCHEDULES,
    title: 'Schedules',
    icon: SchedulesIcon,
    hidden: [USER_ROLE.ADMIN],
  },
  {
    url: ROUTES.BOOKING_HISTORY,
    title: 'Booking History',
    icon: SchedulesIcon,
    hidden: [USER_ROLE.CUSTOMER],
  },
];

/**
 * Given a user role, returns the navigation items that should not be shown.
 * If `hidden` is `null`, returns all the navigation items.
 * If `hidden` is a user role, returns the navigation items that do not have that role
 * in their `hidden` array.
 */
export const getNavigationItemsHiddenByRole = (hidden?: string) =>
  NAVIGATION_ITEMS.filter((tab) => {
    if (
      !hidden ||
      (hidden !== USER_ROLE.CUSTOMER && hidden !== USER_ROLE.ADMIN)
    ) {
      return !tab.hidden?.length;
    }
    return !tab.hidden?.includes(hidden);
  });

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
