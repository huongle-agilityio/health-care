import { z } from 'zod';

import { validateEmail, validatePhone, validateRequired } from './validate';

export const bookingSchema = z.object({
  time: validateRequired,
  name: validateRequired,
  reason: validateRequired,
  date: validateRequired,
  phone: validatePhone,
  email: validateEmail,
});
