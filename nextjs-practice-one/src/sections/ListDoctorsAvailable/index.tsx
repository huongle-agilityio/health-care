// Actions
import { getDoctors } from '@/actions';

// Constants
import { ROUTERS } from '@/constants';

// Components
import { Card, Pagination } from '@/components';

export const ListDoctorsAvailable = async ({ page }: { page?: number }) => {
  const { data: doctors, meta } = await getDoctors(page);
  const {
    pagination: { page: currentPage, pageCount },
  } = meta;

  return (
    <div className="flex flex-col gap-[84px] items-center">
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
    </div>
  );
};
