import Link from 'next/link';

// Constants
import { ROUTERS } from '@/constants';

// Components
import { FormLogin } from '@/sections';
import { Text } from '@/components';

const Page = () => (
  <>
    <Text variants="h1" size="3xl" color="tertiary">
      Login
    </Text>
    <div className="flex gap-2 py-15">
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
