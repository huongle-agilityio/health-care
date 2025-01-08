export const ROUTERS = {
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

export const PRIVATE_ROUTERS = [ROUTERS.BOOKING_APPOINTMENTS, ROUTERS.SETTING];
export const AUTH_ROUTERS = [ROUTERS.LOGIN, ROUTERS.REGISTER];
