// Types
import { Option, Specialty } from '@/types';

/**
 * Formats an array of specialties into an array of options.
 *
 * @param {Specialty[]} values The array of specialties to format.
 * @returns {Option[]} An array of options with value and label properties.
 */
export const formatSpecialtiesOption = (values: Specialty[]): Option[] =>
  values.map(({ name }) => ({
    value: name,
    label: name,
  }));
