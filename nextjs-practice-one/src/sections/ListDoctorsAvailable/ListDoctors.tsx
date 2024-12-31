import { memo } from 'react';

// Components
import { Card, Pagination } from '@/components';

// Constants
import { ROUTERS } from '@/constants';

// Constants
import { Doctor } from '@/types';

interface ListDoctors {
  doctors: Doctor[];
  currentPage: number;
  pageCount: number;
}

export const ListDoctors = memo(
  ({ doctors, currentPage, pageCount }: ListDoctors) => (
    <>
      <div className="flex flex-wrap gap-x-8 gap-y-20 justify-center">
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
            <Card
              key={`doctor-${id}`}
              experience={experience}
              imageSrc={avatar}
              name={name}
              href={ROUTERS.BOOKING_APPOINTMENTS(documentId)}
              rating={rating}
              specialty={specialty?.name || ''}
            />
          ),
        )}
      </div>
      <Pagination page={currentPage} total={pageCount} />
    </>
  ),
);

ListDoctors.displayName = 'ListDoctors';
