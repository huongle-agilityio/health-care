// Actions
import { getDoctorsByParams, getSpecialties } from '@/actions';

// Constants
import { DOCTOR_LIST_AVAILABLE_SECTION_ID } from '@/constants';

// Components
import { Pagination, Text } from '@/ui/components';
import { ListDoctors } from './ListDoctors';
import { ButtonAddNew } from './ButtonAddNew';

// Utils
import { cn } from '@/utils';

type ListDoctorsAvailableProps = {
  queryString: string;
};

export const ListDoctorsAvailable = async ({
  queryString,
}: ListDoctorsAvailableProps) => {
  const { data: doctors, meta, error } = await getDoctorsByParams(queryString);
  const { data: specialties } = await getSpecialties();

  const {
    page: currentPage = 1,
    pageCount = 0,
    total = 0,
  } = meta?.pagination || {};

  // TODO: implement admin role
  const isAdmin = true;

  return (
    <>
      <div
        className={cn(
          'flex flex-col items-center',
          { 'pb-20': !isAdmin, 'pb-10': isAdmin },
          'pt-[330px] 2xl:pt-[120px]',
        )}
        id={DOCTOR_LIST_AVAILABLE_SECTION_ID}
      >
        <Text
          color="tertiary"
          size="4xl"
          className="text-[40px] md:text-[60px] text-center"
        >
          {total > 1 ? `${total} doctors` : `${total} doctor`} available
        </Text>
        <Text size="xl" color="holder" className="text-center">
          Book appointments with minimum wait-time & verified doctor details
        </Text>
      </div>

      <ButtonAddNew shouldShowButton={isAdmin} specialties={specialties} />

      <div className="flex flex-col gap-[84px] items-center">
        {error ? (
          <div className="px-10 py-25">
            <Text color="error">{error}</Text>
          </div>
        ) : (
          <>
            {!doctors.length ? (
              <div className="px-10 py-25">
                <Text color="tertiary">No results found.</Text>
              </div>
            ) : (
              <ListDoctors doctors={doctors} specialties={specialties} />
            )}
            <Pagination
              page={currentPage}
              total={pageCount}
              scrollTo={`#${DOCTOR_LIST_AVAILABLE_SECTION_ID}`}
            />
          </>
        )}
      </div>
    </>
  );
};
