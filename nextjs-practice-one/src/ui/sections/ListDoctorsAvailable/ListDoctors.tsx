import { memo } from 'react';

// Components
import { DoctorCard, Pagination, Text } from '@/ui/components';

// Constants
import { DOCTOR_LIST_AVAILABLE_SECTION_ID, ROUTES } from '@/constants';

// Constants
import { Doctor } from '@/types';

interface ListDoctors {
  pageCount: number;
  currentPage: number;
  doctors: Doctor[];
}

export const ListDoctors = memo(
  ({ doctors, currentPage, pageCount }: ListDoctors) => (
    <>
      {!doctors.length ? (
        <div className="px-10 py-25">
          <Text color="tertiary">No results found.</Text>
        </div>
      ) : (
        <div className="flex flex-wrap gap-x-8 gap-y-20 w-full justify-center lg:justify-start">
          {doctors.map(
            ({
              id,
              documentId = '',
              experience,
              avatar,
              name,
              rating,
              specialty,
            }) => (
              <DoctorCard
                key={`doctor-${id}`}
                experience={experience}
                imageSrc={avatar}
                name={name}
                href={ROUTES.BOOKING_APPOINTMENTS_DETAIL(documentId)}
                rating={rating}
                specialty={specialty?.name || ''}
              />
            ),
          )}
        </div>
      )}
      <Pagination
        page={currentPage}
        total={pageCount}
        scrollTo={`#${DOCTOR_LIST_AVAILABLE_SECTION_ID}`}
      />
    </>
  ),
);

ListDoctors.displayName = 'ListDoctors';
