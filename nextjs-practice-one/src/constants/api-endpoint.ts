export const BASE_API = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINT = {
  SIGN_IN: 'api/auth/local',
  SIGN_UP: 'api/auth/local/register',

  // Specialty
  SPECIALTY: 'api/specialties',

  // Doctor
  DOCTOR: 'api/doctors',

  DOCTOR_TIME_SLOT: 'api/doctor-time-slots',

  TIME_SLOT: 'api/time-slots',
};
