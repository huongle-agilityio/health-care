import { Metadata } from 'next';

// Components
import { Text } from '@/ui/components';
import { ListUserInfo } from '@/ui/sections';

// Icons
import { UserIcon } from '@/ui/icons';

// Config
import { getUserFromSession } from '@/utils/auth';

export const metadata: Metadata = {
  title: 'Setting',
};

const Page = async () => {
  const { email, name, phone } = await getUserFromSession();

  return (
    <div className="container">
      <div className="flex flex-col pt-[50px] 2xl:pt-[80px] pb-20 items-center">
        <Text
          variants="h1"
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
  );
};

export default Page;
