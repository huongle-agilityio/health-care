import { memo } from 'react';

// Components
import { Image, Rating, Text } from '@/components';

// Icons
import { HourglassIcon, StethoscopeIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

// Types
import { Doctor } from '@/types';

type DoctorInfoProps = Omit<Doctor, 'id' | 'fee'>;

export const DoctorInfo = memo(
  ({ name, specialty, experience, rating, avatar }: DoctorInfoProps) => (
    <div className="flex gap-15">
      <div className="flex flex-col items-center">
        <Image
          src={avatar}
          alt={`Dr ${name}'s image`}
          sizes="(max-width: 768px) 75px, 150px"
          classNameWrapper={cn(
            'rounded-full',
            'w-[75px] h-[75px]',
            'md:w-[150px] md:h-[150px]',
          )}
        />
        <Text size="2xl" color="tertiary" className="text-center">
          Dr {name}
        </Text>
      </div>
      <div className="flex flex-col gap-15 pt-10">
        <div className="flex gap-3">
          <StethoscopeIcon />
          <Text size="xs" color="holder">
            {specialty?.name || ''}
          </Text>
        </div>

        <div className="flex gap-3">
          <HourglassIcon />
          <Text size="xs" color="holder">
            {experience} Years
          </Text>
        </div>

        <div className="flex gap-6">
          <Text size="xs" color="holder">
            Ratings:
          </Text>
          <Rating value={rating} />
        </div>
      </div>
    </div>
  ),
);

DoctorInfo.displayName = 'DoctorInfo';
