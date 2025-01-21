import { z } from 'zod';

import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateRequired,
} from './validate';

export const loginSchema = z.object({
  email: validateEmail,
  password: validateRequired,
});

export const signUpSchema = z.object({
  name: validateName,
  phone: validatePhone,
  email: validateEmail,
  password: validatePassword,
});
