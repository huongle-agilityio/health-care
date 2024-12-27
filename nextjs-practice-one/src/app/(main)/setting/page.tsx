// Components
import { Text } from '@/components';
import { ListUserInfo, ListBooking } from '@/sections';

// Icons
import { UserIcon } from '@/icons';

const Page = () => (
  <div className="container">
    <div>
      <div className="flex flex-col pt-[50px] 2xl:pt-[80px] pb-20 items-center">
        <Text color="tertiary" size="4xl">
          Information
        </Text>
      </div>
      <div className="p-25 rounded-xl shadow-xl flex flex-col gap-15">
        <div className="flex gap-8 items-center">
          <UserIcon className="w-18 h-18" />
          <Text color="tertiary" size="2xl">
            Your Information
          </Text>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-8">
          <ListUserInfo />
        </div>
      </div>
    </div>

    <div>
      <div className="flex flex-col pt-[50px] 2xl:pt-[80px] pb-20 items-center">
        <Text color="tertiary" size="4xl">
          Schedules
        </Text>
      </div>

      <div className="w-fit flex flex-row gap-20">
        <ListBooking />
      </div>
    </div>
  </div>
);

export default Page;