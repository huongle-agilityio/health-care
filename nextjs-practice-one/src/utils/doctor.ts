import { EXPERIENCES } from '@/constants/mocks';

/**
 * Functions to get experience range
 * @param value {string} get from select experience
 * @returns expStart and expEnd range
 */
export const getExperienceRange = (
  value: string,
): { expStart: number; expEnd: number } => {
  const experience = EXPERIENCES.find((exp) => exp.value === value);

  if (!experience) {
    return { expStart: 0, expEnd: 0 };
  }

  const [expStart, expEnd] = experience.label
    .replace(' years', '')
    .split('-')
    .map((exp) => parseInt(exp.trim(), 10));

  return { expStart, expEnd };
};
