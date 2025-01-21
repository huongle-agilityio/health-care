import { Suspense } from 'react';
import { Metadata } from 'next';

// Constants
import { IMAGE_DETAILS } from '@/constants';

// Components
import { Image, Text } from '@/ui/components';
import {
  FilterDoctors,
  ListDoctorsAvailable,
  ListDoctorsAvailableSkeleton,
  SkeletonFilter,
} from '@/ui/sections';

// Types
import { DoctorFilterParams } from '@/types';

// Utils
import { cn } from '@/utils';

export const metadata: Metadata = {
  title: 'Appointments',
};

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<DoctorFilterParams>;
}) => {
  const params = await searchParams;
  const { specialty, rating, experience, fee, page } = params || {};

  return (
    <>
      <div className="bg-primary-100 h-[919px]">
        <div className="container flex">
          <div className="w-[585px] pt-20 md:pt-[194px] md:pb-[403px]">
            <div className="flex flex-col gap-8">
              <Text
                variants="h1"
                size="4xl"
                color="light"
                className="text-[50px] md:text-[60px]"
              >
                Book Your Next Doctor Visit in Seconds.
              </Text>
              <Text color="holder" size="xl" className="text-xl">
                CareMate helps you find the best healthcare provider by
                specialty, location, and more, ensuring you get the care you
                need.
              </Text>
            </div>
          </div>

          <Image
            alt={IMAGE_DETAILS.DOCTOR.alt}
            src={IMAGE_DETAILS.DOCTOR.src}
            classNameWrapper={cn(
              'hidden 2xl:block',
              'min-w-[800px] h-[919px] absolute right-0',
            )}
            priority
          />
        </div>
      </div>
      <div className="container relative">
        <div className="w-11/12 md:w-full max-w-[1360px] absolute top-[-270px] 2xl:top-[-195px]">
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
            <Suspense fallback={<SkeletonFilter />}>
              <FilterDoctors
                specialty={specialty}
                rating={rating}
                experience={experience}
                fee={fee}
              />
            </Suspense>
          </div>
        </div>
        <Suspense fallback={<ListDoctorsAvailableSkeleton />}>
          <ListDoctorsAvailable
            page={page}
            specialty={specialty}
            rating={rating}
            experience={experience}
            fee={fee}
          />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
