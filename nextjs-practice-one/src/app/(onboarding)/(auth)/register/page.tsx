import Link from 'next/link';
import { Metadata } from 'next';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Text } from '@/ui/components';
import { FormSignUp } from '@/ui/sections';

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
      <Link href={ROUTES.LOGIN}>
        <Text size="xs" color="primary">
          Login
        </Text>
      </Link>
    </div>
    <FormSignUp />
  </>
);

export default Page;
