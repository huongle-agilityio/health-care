import { Suspense } from 'react';
import { Metadata } from 'next';

// Components
import { Text } from '@/components';
import { ListUserInfo, ListBooking, ListBookingSkeleton } from '@/sections';

// Icons
import { UserIcon } from '@/icons';

// Config
import { auth } from '@/config';

export const metadata: Metadata = {
  title: 'Setting',
};

const Page = async () => {
  const session = await auth();
  const { email = '', name = '', phone = '', id = '' } = session?.user || {};

  return (
    <div className="container">
      <div>
        <div className="flex flex-col pt-[50px] 2xl:pt-[80px] pb-20 items-center">
          <Text
            color="tertiary"
            size="4xl"
            className="text-[40px] md:text-[60px]"
          >
            Information
          </Text>
        </div>
        <div className="p-12 md:p-25 rounded-xl shadow-xl flex flex-col gap-15">
          <div className="flex gap-8 items-center">
            <UserIcon className="w-18 h-18" />
            <Text color="tertiary" size="2xl">
              Your Information
            </Text>
          </div>

          <div className="flex flex-col md:grid grid-cols-2 gap-x-8 gap-y-8">
            <ListUserInfo email={email} name={name} phone={phone} />
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col pt-[50px] 2xl:pt-[80px] pb-20 items-center">
          <Text
            color="tertiary"
            size="4xl"
            className="text-[40px] md:text-[60px]"
          >
            Schedules
          </Text>
        </div>

        <div className="min-h-[500px]">
          <div className="w-fit flex flex-col md:flex-row w-full flex-wrap gap-20">
            <Suspense fallback={<ListBookingSkeleton />}>
              <ListBooking userId={id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
