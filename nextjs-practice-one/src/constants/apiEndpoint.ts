export const BASE_API = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINT = {
  SIGN_IN: 'auth/local',
  SIGN_UP: 'auth/local/register',

  // Specialty
  SPECIALTY: 'specialties',

  // Doctor
  DOCTOR: 'doctors',

  BOOKING_SLOT: 'booking-time-slots',

  TIME_SLOT: 'time-slots',
};
