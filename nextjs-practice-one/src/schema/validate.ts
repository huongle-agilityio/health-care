import { z } from 'zod';

// Constants
import {
  ACCEPTED_IMAGE_TYPES,
  ERROR_MESSAGES,
  FILE_SIZE_LIMIT,
  REGEX_EMAIL,
  REGEX_NAME,
  REGEX_PASSWORD,
  REGEX_PHONE_NUMBER,
} from '@/constants';

export const validateRequiredString = z.string({
  message: ERROR_MESSAGES.REQUIRED,
});

export const validateRequiredNumber = z.number({
  message: ERROR_MESSAGES.REQUIRED,
});

export const validateRequiredStringToNumber = z
  .string({ required_error: ERROR_MESSAGES.REQUIRED })
  .refine((value) => !isNaN(Number(value)), {
    message: ERROR_MESSAGES.INVALID_NUMBER,
  })
  .transform((value) => Number(value));

export const validateRequiredFile = z.union([
  z
    .instanceof(File, { message: ERROR_MESSAGES.REQUIRED })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      ERROR_MESSAGES.INVALID_FILE,
    )
    .refine((file) => file.size <= FILE_SIZE_LIMIT, {
      message: ERROR_MESSAGES.MAX_FILE_SIZE,
    }),
  z.string(),
]);

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
