import { z } from 'zod';

import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateRequired,
} from './validate';

export const loginSchema = z.object({
  email: validateEmail,
  password: validatePassword,
});

export const signUpSchema = z.object({
  name: validateRequired,
  phone: validatePhone,
  email: validateEmail,
  password: validatePassword,
});
