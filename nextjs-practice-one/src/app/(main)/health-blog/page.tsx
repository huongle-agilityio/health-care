import { Metadata } from 'next';

// Components
import { UpComing } from '@/sections/UpComing';

export const metadata: Metadata = {
  title: 'Health Blog',
};

const Page = () => <UpComing />;

export default Page;
