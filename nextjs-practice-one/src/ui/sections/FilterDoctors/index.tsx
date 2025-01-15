import { memo } from 'react';

// Components
import { Text } from '@/ui/components';
import { FormFilterDoctors } from '../FormFilterDoctors';

// Types
import { DoctorFilterParams } from '@/types';

// Utils
import { cn } from '@/utils';

export const FilterDoctors = memo(
  async ({ specialty, rating, experience, fee }: DoctorFilterParams) => {
    return (
      <div
        className={cn(
          'w-11/12 xl:w-full',
          'py-20 px-12',
          'flex flex-col gap-17',
          'rounded-2xl bg-background-100 shadow-xl',
        )}
      >
        <Text size="3xl" color="tertiary">
          Find a doctor at your own ease
        </Text>
        <FormFilterDoctors
          specialty={specialty}
          rating={rating}
          experience={experience}
          fee={fee}
        />
      </div>
    );
  },
);

FilterDoctors.displayName = 'FilterDoctors';
