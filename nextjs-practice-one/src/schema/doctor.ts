import { z } from 'zod';
import { validateRequiredString, validateRequiredNumber } from './validate';

export const doctorPayloadAPISchema = z.object({
  data: z.object({
    name: validateRequiredString,
    fee: validateRequiredNumber,
    rating: validateRequiredNumber,
    experience: validateRequiredNumber,
    specialty: validateRequiredString,
    avatar: validateRequiredString,
  }),
});
