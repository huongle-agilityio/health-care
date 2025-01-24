import { KEY_UPLOAD_IMAGE, UPLOAD_IMAGE_URL } from './envVars';

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

  IMAGE: `${UPLOAD_IMAGE_URL}?key=${KEY_UPLOAD_IMAGE}`,
};

export const API_ROUTE_ENDPOINT = {
  SIGN_IN: 'auth/login',
  SIGN_UP: 'auth/sign-up',

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
