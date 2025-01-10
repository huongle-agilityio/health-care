// Types
import { Specialty, Option } from '@/types';

// Constants
import { SPECIALTIES_MOCK } from '@/constants/mocks';

// Utils
import { formatSpecialtiesOption } from '..';

describe('formatSpecialtiesOption', () => {
  it('Should format an array of specialties into an array of options', () => {
    const expectedOptions: Option[] = [
      { value: 'Cardiology', label: 'Cardiology' },
      { value: 'Neurology', label: 'Neurology' },
      { value: 'Orthopedics', label: 'Orthopedics' },
    ];
    const result = formatSpecialtiesOption(SPECIALTIES_MOCK);

    expect(result).toEqual(expectedOptions);
  });

  it('Should return an empty array when given an empty array', () => {
    const specialties: Specialty[] = [];
    const expectedOptions: Option[] = [];
    const result = formatSpecialtiesOption(specialties);

    expect(result).toEqual(expectedOptions);
  });

  it('Should handle an array with one specialty correctly', () => {
    const specialties: Specialty[] = [{ id: 1, name: 'Dermatology' }];
    const expectedOptions: Option[] = [
      { value: 'Dermatology', label: 'Dermatology' },
    ];
    const result = formatSpecialtiesOption(specialties);

    expect(result).toEqual(expectedOptions);
  });
});
