import { EXPERIENCES } from '@/constants/mocks';

/**
 * Functions to get experience range
 * @param value {string} get from select experience
 * @returns expStart and expEnd range
 */
export const getExperienceRange = (
  value: string,
): { expStart: string; expEnd: string } => {
  const experience = EXPERIENCES.find((exp) => exp.value === value);

  if (!experience) {
    return { expStart: '', expEnd: '' };
  }

  const [expStart, expEnd] = experience.label
    .replace(' years', '')
    .split('-')
    .map((exp) => exp.trim());

  return { expStart, expEnd };
};
