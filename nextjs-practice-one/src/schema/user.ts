import { z } from 'zod';

import {
  validateEmail,
  validateName,
  validatePhone,
  validateRequiredFile,
  validateRequiredString,
} from './validate';

export const userSchema = z.object({
  name: validateName,
  phone: validatePhone,
  email: validateEmail,
  avatar: validateRequiredFile,
});

export const userPayloadSchema = z.object({
  name: validateName,
  phone: validatePhone,
  email: validateEmail,
  avatar: validateRequiredString,
});
