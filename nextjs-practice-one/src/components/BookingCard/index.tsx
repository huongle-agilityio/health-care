'use client';

import {
  Card as CardNextUI,
  CardHeader,
  CardBody,
  extendVariants,
  Chip,
} from '@nextui-org/react';

// Constants
import { BOOKING_STATUS } from '@/constants';

// Components
import { Text, Image } from '..';

// Utils
import { cn, getBookingStatus } from '@/utils';

const CardBase = extendVariants(CardNextUI, {
  variants: {
    color: {
      default: {
        base: cn(
          'bg-background-200 border-secondary-100 border-2',
          'flex-row py-8',
          'md:min-w-[230px] md:flex-col md:py-10 md:px-8 md:items-center',
        ),
      },
    },
  },
  defaultVariants: {
    shadow: 'none',
    color: 'default',
  },
});

const CardHeaderBase = extendVariants(CardHeader, {
  variants: {
    color: {
      default: cn(
        'w-fit md:w-full pt-8 md:pt-2 px-4 items-start',
        'justify-center',
      ),
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

const CardBodyBase = extendVariants(CardBody, {
  variants: {
    color: {
      default: 'min-w-[200px] md:w-fit flex md:flex-col gap-4 md:gap-10',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

interface BookingCardProps {
  name: string;
  date: string;
  imageSrc: string;
  time: string;
}

export const BookingCard = ({
  date,
  name,
  imageSrc,
  time,
}: BookingCardProps) => {
  const statusBooking = getBookingStatus(date);
  const chipColors = {
    'bg-amber-400': statusBooking === BOOKING_STATUS.TODAY,
    'bg-lime-600': statusBooking === BOOKING_STATUS.UPCOMING,
    'bg-red-400': statusBooking === BOOKING_STATUS.EXPIRED,
  };

  return (
    <CardBase>
      <CardHeaderBase>
        <Image
          src={imageSrc}
          alt={`Dr ${name}'s image`}
          classNameWrapper={cn('rounded-full', 'w-[75px] h-[75px]')}
        />
      </CardHeaderBase>
      <CardBodyBase>
        <div className="flex flex-col md:items-center md:justify-center">
          <div className="block md:hidden">
            <Chip
              className={cn('bg-amber-400 text-primary-500 py-4', chipColors)}
            >
              {statusBooking}
            </Chip>
          </div>
          <Text size="2xl" color="tertiary" className="md:text-center">
            Dr {name}
          </Text>
        </div>

        <div className="flex flex-col gap-4">
          <Text size="2xs" color="holder">
            Date:{' '}
            <Text variants="span" color="tertiary">
              {date}
            </Text>
          </Text>

          <Text size="2xs" color="holder">
            Time:{' '}
            <Text variants="span" color="tertiary">
              {time}
            </Text>
          </Text>

          <div className="hidden md:flex gap-4">
            <Text size="2xs" color="holder">
              Status:
            </Text>
            <Chip
              className={cn('bg-amber-400 text-primary-500 py-4', chipColors)}
            >
              {statusBooking}
            </Chip>
          </div>
        </div>
      </CardBodyBase>
    </CardBase>
  );
};
