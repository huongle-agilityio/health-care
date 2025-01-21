import { z } from 'zod';

// Constants
import {
  ERROR_MESSAGES,
  REGEX_EMAIL,
  REGEX_NAME,
  REGEX_PASSWORD,
  REGEX_PHONE_NUMBER,
} from '@/constants';

export const optional = z.string().optional();

export const validateRequired = z
  .string()
  .min(1, { message: ERROR_MESSAGES.REQUIRED });

export const validateName = validateRequired.regex(REGEX_NAME, {
  message: ERROR_MESSAGES.INVALID_NAME,
});

export const validateEmail = validateRequired.regex(REGEX_EMAIL, {
  message: ERROR_MESSAGES.INVALID_EMAIL,
});

export const validatePassword = validateRequired.regex(REGEX_PASSWORD, {
  message: ERROR_MESSAGES.INVALID_PASSWORD,
});

export const validatePhone = validateRequired
  .min(10, { message: ERROR_MESSAGES.MAX_PHONE_NUMBER })
  .regex(REGEX_PHONE_NUMBER, {
    message: ERROR_MESSAGES.INVALID_PHONE,
  });
