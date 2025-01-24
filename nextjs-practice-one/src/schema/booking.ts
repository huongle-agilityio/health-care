import { z } from 'zod';

import {
  validateEmail,
  validateName,
  validatePhone,
  validateRequiredString,
} from './validate';

export const bookingSchema = z.object({
  time: validateRequiredString,
  name: validateName,
  reason: validateRequiredString,
  date: validateRequiredString,
  phone: validatePhone,
  email: validateEmail,
});

export const bookingPayloadAPISchema = z.object({
  data: z.object({
    date: validateRequiredString,
    timeSlot: validateRequiredString,
    doctor: validateRequiredString,
    reason: validateRequiredString,
    user: validateRequiredString,
  }),
});
