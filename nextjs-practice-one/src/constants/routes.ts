export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Appointments
  APPOINTMENTS: '/appointments',
  BOOKING_APPOINTMENTS: '/booking-appointments',
  BOOKING_APPOINTMENTS_DETAIL: (doctorId: string) =>
    `/appointments/${doctorId}/booking-appointments`,

  HEALTH_BLOG: '/health-blog',
  REVIEWS: '/reviews',

  // Setting
  SETTING: '/setting',
};

export const PRIVATE_ROUTERS = [ROUTES.BOOKING_APPOINTMENTS, ROUTES.SETTING];
export const AUTH_ROUTERS = [ROUTES.LOGIN, ROUTES.REGISTER];
