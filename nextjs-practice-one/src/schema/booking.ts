import { z } from 'zod';

import {
  validateEmail,
  validateName,
  validatePhone,
  validateRequired,
} from './validate';

export const bookingSchema = z.object({
  time: validateRequired,
  name: validateName,
  reason: validateRequired,
  date: validateRequired,
  phone: validatePhone,
  email: validateEmail,
});
