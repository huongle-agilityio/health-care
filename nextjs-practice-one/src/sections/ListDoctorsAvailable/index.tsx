// Actions
import { getDoctorsByParams } from '@/actions';

// Constants
import { ROUTERS } from '@/constants';

// Components
import { Card, Pagination, Text } from '@/components';

// Types
import { DoctorFilterParams } from '@/types';

type ListDoctorsAvailableProps = DoctorFilterParams;

export const ListDoctorsAvailable = async ({
  page,
  specialty,
  rating,
  experience,
  fee,
}: ListDoctorsAvailableProps) => {
  const {
    data: doctors,
    meta,
    error,
  } = await getDoctorsByParams({
    page,
    specialty,
    rating,
    experience,
    fee,
  });
  const {
    pagination: { page: currentPage, pageCount, total },
  } = meta;

  return (
    <>
      <div className="flex flex-col pt-[330px] 2xl:pt-[120px] pb-20 items-center">
        <Text color="tertiary" size="4xl" className="text-center">
          {total} doctors available
        </Text>
        <Text size="xl" color="holder" className="text-center">
          Book appointments with minimum wait-time & verified doctor details
        </Text>
      </div>
      <div className="flex flex-col gap-[84px] items-center">
        {error ? (
          <div className="px-10 py-25">
            <Text color="error">{error}</Text>
          </div>
        ) : !doctors.length ? (
          <div className="px-10 py-25">
            <Text color="tertiary">No results found.</Text>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};
