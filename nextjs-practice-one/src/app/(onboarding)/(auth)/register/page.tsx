import Link from 'next/link';
import { Metadata } from 'next';

// Constants
import { ROUTERS } from '@/constants';

// Components
import { Text } from '@/components';
import { FormSignUp } from '@/sections';

export const metadata: Metadata = {
  title: 'Register',
};

const Page = () => (
  <>
    <Text variants="h1" size="3xl" color="tertiary">
      Sign Up
    </Text>
    <div className="flex gap-2 py-15">
      <Text size="xs" color="holder">
        Already a member?
      </Text>
      <Link href={ROUTERS.LOGIN}>
        <Text size="xs" color="primary">
          Login
        </Text>
      </Link>
    </div>
    <FormSignUp />
  </>
);

export default Page;
