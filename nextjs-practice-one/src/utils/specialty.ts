// Types
import { Option, Specialty } from '@/types';

/**
 * Format data Specialties to option select
 * @param values specialties
 * @returns option value select
 */
export const formatSpecialtiesOption = (values: Specialty[]): Option[] =>
  values.map(({ name }) => ({
    value: name,
    label: name,
  }));
