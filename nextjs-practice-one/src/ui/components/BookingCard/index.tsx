'use client';

import { memo } from 'react';
import { extendVariants, Chip } from '@heroui/react';

// Constants
import { BOOKING_STATUS_COLORS } from '@/constants';

// Components
import { Text } from '../Text';
import { CardHeader, CardBody, Card } from '../Card';
import { Image } from '../Image';

// Utils
import { cn, getBookingStatus } from '@/utils';

const CardBase = extendVariants(Card, {
  variants: {
    color: {
      default: {
        base: cn(
          'bg-background-200 border-secondary-100 border-2',
          'flex-row py-8',
          'md:w-[230px] md:flex-col md:py-10 md:px-8 md:items-center',
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
        'w-fit md:w-full pt-8 md:pt-2 px-10 md:px-4 items-start',
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

export const BookingCard = memo(
  ({ date, name, imageSrc, time }: BookingCardProps) => {
    const statusBooking = getBookingStatus(date);
    const chipColors = BOOKING_STATUS_COLORS[statusBooking];

    return (
      <CardBase>
        <CardHeaderBase>
          <Image
            src={imageSrc}
            alt={`Dr ${name}'s avatar`}
            sizes="75px"
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
            <div className="h-[36px] flex">
              <Text
                size="2xl"
                color="tertiary"
                className="md:text-center overflow-hidden text-ellipsis"
              >
                Dr {name}
              </Text>
            </div>
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
  },
);

BookingCard.displayName = 'BookingCard';
