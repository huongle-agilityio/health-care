import { z } from 'zod';

import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
  validateRequiredString,
} from './validate';

export const loginSchema = z.object({
  email: validateEmail,
  password: validateRequiredString,
});

export const signUpSchema = z.object({
  name: validateName,
  phone: validatePhone,
  email: validateEmail,
  password: validatePassword,
});
