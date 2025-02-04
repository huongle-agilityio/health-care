import { KEY_UPLOAD_IMAGE, UPLOAD_IMAGE_URL } from './envVars';

export const API_ENDPOINT = {
  SIGN_IN: 'auth/local',
  SIGN_UP: 'auth/local/register',

  // Users
  USER: 'users',

  // Specialty
  SPECIALTY: 'specialties',

  // Doctor
  DOCTOR: 'doctors',

  // Booking
  BOOKING_SLOT: 'booking-time-slots',

  // Time Slot
  TIME_SLOT: 'time-slots',

  // Image
  IMAGE: `${UPLOAD_IMAGE_URL}?key=${KEY_UPLOAD_IMAGE}`,
};

export const API_ROUTE_ENDPOINT = {
  SIGN_IN: 'auth/login',
  SIGN_UP: 'auth/sign-up',

  // Users
  USER: 'users',

  // Specialty
  SPECIALTY: 'specialties',

  // Doctor
  DOCTOR: 'doctors',
  DOCTOR_PARAMS: 'doctors/params',

  // Booking
  BOOKING_SLOT: 'booking-slots',
  BOOKING_SLOT_USER: 'booking-slots/user/',
  BOOKING_SLOT_DOCTOR: 'booking-slots/doctor/',

  // Time Slot
  TIME_SLOT: 'time-slots',
};
