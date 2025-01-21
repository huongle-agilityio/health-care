import { memo } from 'react';

// Actions
import { getSpecialties } from '@/actions';

// Components
import { FormFilterDoctors } from '../FormFilterDoctors';

// Types
import { DoctorFilterParams } from '@/types';

export const FilterDoctors = memo(
  async ({ specialty, rating, experience, fee }: DoctorFilterParams) => {
    const { data: listSpecialties } = await getSpecialties();

    return (
      <FormFilterDoctors
        listSpecialties={listSpecialties}
        specialty={specialty}
        rating={rating}
        experience={experience}
        fee={fee}
      />
    );
  },
);

FilterDoctors.displayName = 'FilterDoctors';
