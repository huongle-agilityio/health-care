'use client';

import { Chip } from '@heroui/react';
import dayjs from 'dayjs';

// Components
import { Image } from '../Image';
import { Text } from '../Text';

// Icons
import { StethoscopeIcon } from '@/ui/icons';

// Constants
import { BOOKING_STATUS_COLORS, IMAGES } from '@/constants';

// Utils
import { cn, formatTime, getBookingStatus } from '@/utils';

interface BookingHistoryItemProps {
  name?: string;
  date?: string;
  time?: string;
  specialty?: string;
  patient?: string;
  avatar?: string;
}

export const BookingHistoryItem = ({
  avatar = IMAGES.FALLBACK_URL,
  name = '',
  date = '',
  time = '',
  specialty = '',
  patient = '',
}: BookingHistoryItemProps) => {
  const statusBooking = getBookingStatus(date);
  const chipColors = BOOKING_STATUS_COLORS[statusBooking];
  const dateFormat = dayjs(date).isValid()
    ? dayjs(date).format('DD/MM/YYYY')
    : '--/--/----';

  return (
    <>
      {/* Booking History Item web */}
      <div
        className={cn(
          'p-10',
          'hidden md:flex gap-5',
          'border-b-1 border-secondary-200',
        )}
      >
        <div className="flex flex-[3_3_0%] items-center gap-5">
          <Image
            src={avatar}
            alt={`Dr ${name}'s  avatar`}
            sizes="(max-width: 768px) 45px"
            classNameWrapper={cn(
              'rounded-full mt-10 md:mt-0',
              'w-[45px] h-[45px]',
            )}
          />
          <div className="max-w-[200px] whitespace-nowrap">
            <Text
              size="xs"
              color="tertiary"
              className="text-ellipsis overflow-hidden"
            >
              Dr {name}
            </Text>
            <div className="flex gap-3 mt-3">
              <StethoscopeIcon />
              <Text size="2xs" color="holder">
                {specialty}
              </Text>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center">
          <Text size="xs" color="tertiary">
            {dateFormat}
          </Text>
        </div>
        <div className="flex flex-1 items-center">
          <Text size="xs" color="tertiary">
            {formatTime(time)}
          </Text>
        </div>
        <div className="flex flex-[3_3_0%] items-center">
          <Text size="xs" color="tertiary" className="line-clamp-2">
            <Text variants="span" color="holder" size="3xs">
              From
            </Text>{' '}
            {patient}
          </Text>
        </div>
        <div className="flex flex-1 items-center">
          <Chip
            className={cn('bg-amber-400 text-primary-500 py-4', chipColors)}
          >
            {statusBooking}
          </Chip>
        </div>
      </div>

      {/* Booking History Item mobile */}
      <div
        className={cn(
          'p-10',
          'flex md:hidden gap-5',
          'border-b-1 border-secondary-200',
        )}
      >
        <div className="flex justify-center gap-5">
          <Image
            src={avatar}
            alt={`Dr ${name}'s  avatar`}
            sizes="(max-width: 768px) 45px"
            classNameWrapper={cn(
              'rounded-full mt-10 md:mt-0',
              'w-[45px] h-[45px]',
            )}
          />
          <div className="flex flex-col gap-2">
            <Chip
              className={cn('bg-amber-400 text-primary-500 py-4', chipColors)}
            >
              {statusBooking}
            </Chip>
            <Text
              size="xs"
              color="tertiary"
              className="text-ellipsis overflow-hidden whitespace-nowrap"
            >
              Dr {name}
            </Text>
            <Text size="2xs" color="tertiary">
              <Text variants="span" color="holder" size="3xs">
                Date:
              </Text>{' '}
              {date}
            </Text>
            <Text size="2xs" color="tertiary">
              <Text variants="span" color="holder" size="3xs">
                At
              </Text>{' '}
              {formatTime(time)}
            </Text>
            <Text size="2xs" color="tertiary" className="line-clamp-1">
              <Text variants="span" color="holder" size="3xs">
                From
              </Text>{' '}
              {patient}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};
