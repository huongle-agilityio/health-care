export const ROUTERS = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Appointments
  APPOINTMENTS: '/appointments',
  BOOKING_APPOINTMENTS: (doctorId: string) =>
    `/appointments/${doctorId}/booking-appointments`,

  HEALTH_BLOG: '/health-blog',
  REVIEWS: '/reviews',

  // Setting
  SETTING: '/setting',
};
