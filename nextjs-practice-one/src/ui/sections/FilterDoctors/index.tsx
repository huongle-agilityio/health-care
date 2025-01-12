import { memo } from 'react';

// Components
import { Text } from '@/ui/components';
import { FormFilterDoctors } from '../FormFilterDoctors';

// Types
import { DoctorFilterParams } from '@/types';

// Utils
import { cn } from '@/utils';
import { auth } from '@/config';

export const FilterDoctors = memo(
  async ({ specialty, rating, experience, fee }: DoctorFilterParams) => {
    const session = await auth();

    return (
      <div
        className={cn(
          'py-20 px-12',
          'flex flex-col gap-17',
          'rounded-2xl bg-background-100 shadow-xl',
        )}
      >
        <Text size="3xl" color="tertiary">
          Find a doctor at your own ease
        </Text>
        <FormFilterDoctors
          session={session}
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
