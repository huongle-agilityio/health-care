import Link from 'next/link';
import { Metadata } from 'next';

// Constants
import { ROUTERS } from '@/constants';

// Components
import { Text } from '@/components';
import { FormLogin } from '@/sections';

export const metadata: Metadata = {
  title: 'Login',
};

const Page = () => (
  <>
    <Text variants="h1" size="3xl" color="tertiary">
      Login
    </Text>
    <div className="flex flex-col md:flex-row gap-2 py-15">
      <Text size="xs" color="holder">
        Are you a new member?
      </Text>
      <Link href={ROUTERS.REGISTER}>
        <Text size="xs" color="primary">
          Sign up here.
        </Text>
      </Link>
    </div>
    <FormLogin />
  </>
);

export default Page;
