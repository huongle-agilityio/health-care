export enum BOOKING_STATUS {
  UPCOMING = 'Upcoming',
  TODAY = 'ToDay',
  EXPIRED = 'Expired',
}

export const BOOKING_TIMES = [
  { value: '09:00', label: '09:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '14:00', label: '14:00 PM' },
  { value: '15:00', label: '15:00 PM' },
  { value: '16:00', label: '16:00 PM' },
  { value: '17:00', label: '17:00 PM' },
];

export const BOOKING_REASONS = [
  { value: 'checkup', label: 'Checkup' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'followUp', label: 'Follow-up Appointment' },
  { value: 'surgery', label: 'Surgery' },
];

export const BOOKING_STATUS_COLORS = {
  [BOOKING_STATUS.TODAY]: 'bg-amber-400',
  [BOOKING_STATUS.UPCOMING]: 'bg-lime-600',
  [BOOKING_STATUS.EXPIRED]: 'bg-red-400',
};
