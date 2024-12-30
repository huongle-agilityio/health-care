'use client';

import { memo } from 'react';
import {
  Card as CardNextUI,
  CardHeader,
  CardBody,
  CardFooter,
  extendVariants,
} from '@nextui-org/react';
import Link from 'next/link';

// Components
import { Text, Button, Image, Rating } from '..';

// Icons
import { HourglassIcon, StethoscopeIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

const CardBase = extendVariants(CardNextUI, {
  variants: {
    color: {
      default: {
        base: cn(
          'py-10 px-6 md:py-17',
          'bg-background-200 border-secondary-100 border-2',
          'flex-row',
          'md:w-[430px] md:flex-col md:h-[508px] md:py-17 md:px-20 md:items-center',
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
        'w-fit pt-8 md:pt-2 px-4 items-start',
        'md:pt-2 md:px-4 md:justify-center',
      ),
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

const CardFooterBase = extendVariants(CardFooter, {
  variants: {
    color: {
      default: 'justify-center hidden md:flex',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

const CardBodyBase = extendVariants(CardBody, {
  variants: {
    color: {
      default: 'md:pt-[27px] gap-8 md:gap-0 md:pb-20 md:items-center',
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

interface CardProps {
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  imageSrc: string;
  href: string;
  className?: {
    wrap?: string;
    header?: string;
    body?: string;
    footer?: string;
  };
}

export const Card = memo(
  ({ specialty, name, imageSrc, experience, rating, href }: CardProps) => (
    <CardBase>
      <CardHeaderBase>
        <Image
          src={imageSrc}
          alt={`Dr ${name}'s image`}
          classNameWrapper={cn(
            'rounded-full',
            'w-[75px] h-[75px]',
            'md:w-[150px] md:h-[150px]',
          )}
        />
      </CardHeaderBase>
      <CardBodyBase>
        <div>
          <Text size="2xl" color="tertiary" className="md:text-center">
            Dr {name}
          </Text>

          <div className="pt-5 flex gap-[15px]">
            <div className="flex gap-3">
              <StethoscopeIcon />
              <Text size="xs" color="holder">
                {specialty}
              </Text>
            </div>

            <div className="flex gap-3">
              <HourglassIcon />
              <Text size="xs" color="holder">
                {experience} Years
              </Text>
            </div>
          </div>

          <div className="flex gap-6 pt-4 md:pt-[30px]">
            <Text size="xs" color="holder">
              Ratings:
            </Text>
            <Rating value={rating} />
          </div>
        </div>

        <Link href={href} aria-label="Navigate to booking page">
          <Button
            size="xs"
            color="bordered"
            variant="bordered"
            className="md:hidden"
          >
            Book
          </Button>
        </Link>
      </CardBodyBase>

      <CardFooterBase>
        <Link href={href}>
          <Button color="bordered" variant="bordered">
            Book Appointment
          </Button>
        </Link>
      </CardFooterBase>
    </CardBase>
  ),
);

Card.displayName = 'Card';
