import { Option, Specialty } from '@/types';

export const SPECIALTIES: Option[] = [
  {
    value: 'dentist',
    label: 'Dentist',
  },
  {
    value: 'dermatology',
    label: 'Dermatology',
  },
  {
    value: 'neurology',
    label: 'Neurology',
  },
  {
    value: 'psychiatry',
    label: 'Psychiatry',
  },
  {
    value: 'cardiology',
    label: 'Cardiology',
  },
];

export const SPECIALTIES_MOCK: Specialty[] = [
  { id: 1, name: 'Cardiology' },
  { id: 2, name: 'Neurology' },
  { id: 3, name: 'Orthopedics' },
];
