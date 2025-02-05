import { z } from 'zod';
import {
  validateRequiredString,
  validateRequiredNumber,
  validateRequiredFile,
  validateName,
  validateRequiredStringToNumber,
} from './validate';

// Constants
import { ERROR_MESSAGES } from '@/constants';

export const doctorPayload = z.object({
  name: validateName,
  fee: validateRequiredStringToNumber.refine((num) => num >= 10 && num <= 20, {
    message: ERROR_MESSAGES.OUT_OF_RANGE(10, 20),
  }),
  rating: validateRequiredStringToNumber,
  experience: validateRequiredStringToNumber.refine(
    (num) => num > 0 && num <= 20,
    {
      message: ERROR_MESSAGES.OUT_OF_RANGE(0, 20),
    },
  ),
  specialty: validateRequiredString,
  avatar: validateRequiredFile,
});

export const doctorPayloadAPISchema = z.object({
  name: validateName,
  fee: validateRequiredNumber.refine((num) => num >= 10 && num <= 20, {
    message: ERROR_MESSAGES.OUT_OF_RANGE(10, 20),
  }),
  rating: validateRequiredNumber,
  experience: validateRequiredNumber.refine((num) => num > 0 && num < 20, {
    message: ERROR_MESSAGES.OUT_OF_RANGE(0, 20),
  }),
  specialty: validateRequiredString,
  avatar: validateRequiredString,
});
