// Actions
import { getDoctorsByParams } from '@/actions';

// Constants
import { DOCTOR_LIST_AVAILABLE_SECTION_ID } from '@/constants';

// Components
import { Text } from '@/ui/components';
import { ListDoctors } from './ListDoctors';

type ListDoctorsAvailableProps = {
  queryString: string;
};

export const ListDoctorsAvailable = async ({
  queryString,
}: ListDoctorsAvailableProps) => {
  const { data: doctors, meta, error } = await getDoctorsByParams(queryString);
  const {
    page: currentPage = 1,
    pageCount = 0,
    total = 0,
  } = meta?.pagination || {};

  return (
    <>
      <div
        className="flex flex-col pt-[330px] 2xl:pt-[120px] pb-20 items-center"
        id={DOCTOR_LIST_AVAILABLE_SECTION_ID}
      >
        <Text
          color="tertiary"
          size="4xl"
          className="text-[40px] md:text-[60px] text-center"
        >
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
        ) : (
          <ListDoctors
            doctors={doctors}
            currentPage={currentPage}
            pageCount={pageCount}
          />
        )}
      </div>
    </>
  );
};
