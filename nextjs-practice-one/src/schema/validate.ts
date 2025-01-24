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

export const validateRequiredString = z
  .string()
  .min(1, { message: ERROR_MESSAGES.REQUIRED });

export const validateRequiredNumber = z
  .number()
  .min(1, { message: ERROR_MESSAGES.REQUIRED });

export const validateName = validateRequiredString.regex(REGEX_NAME, {
  message: ERROR_MESSAGES.INVALID_NAME,
});

export const validateEmail = validateRequiredString.regex(REGEX_EMAIL, {
  message: ERROR_MESSAGES.INVALID_EMAIL,
});

export const validatePassword = validateRequiredString.regex(REGEX_PASSWORD, {
  message: ERROR_MESSAGES.INVALID_PASSWORD,
});

export const validatePhone = validateRequiredString
  .min(10, { message: ERROR_MESSAGES.MAX_PHONE_NUMBER })
  .regex(REGEX_PHONE_NUMBER, {
    message: ERROR_MESSAGES.INVALID_PHONE,
  });
