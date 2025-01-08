import { z } from 'zod';

// Constants
import {
  ERROR_MESSAGES,
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_PHONE_NUMBER,
} from '@/constants';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: ERROR_MESSAGES.REQUIRED })
    .regex(REGEX_EMAIL, {
      message: ERROR_MESSAGES.INVALID_EMAIL,
    }),
  password: z
    .string()
    .min(1, { message: ERROR_MESSAGES.REQUIRED })
    .regex(REGEX_PASSWORD, {
      message: ERROR_MESSAGES.INVALID_PASSWORD,
    }),
});

export const signUpSchema = z.object({
  name: z.string().min(1, { message: ERROR_MESSAGES.REQUIRED }),
  phone: z
    .string()
    .min(1, { message: ERROR_MESSAGES.REQUIRED })
    .min(10, { message: ERROR_MESSAGES.MAX_PHONE_NUMBER })
    .regex(REGEX_PHONE_NUMBER, {
      message: ERROR_MESSAGES.INVALID_PHONE,
    }),
  email: z
    .string()
    .min(1, { message: ERROR_MESSAGES.REQUIRED })
    .regex(REGEX_EMAIL, {
      message: ERROR_MESSAGES.INVALID_EMAIL,
    }),
  password: z
    .string()
    .min(1, { message: ERROR_MESSAGES.REQUIRED })
    .regex(REGEX_PASSWORD, {
      message: ERROR_MESSAGES.INVALID_PASSWORD,
    }),
});
