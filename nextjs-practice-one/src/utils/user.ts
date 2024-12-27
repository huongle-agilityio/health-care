import { ListInfo } from '@/types';

/**
 * format user information
 * @returns
 */
export const formatUserInfo = ({
  name,
  phone,
  email,
  gender,
}: {
  name: string;
  phone: string;
  email: string;
  gender: string;
}): ListInfo[] => [
  {
    title: 'Name',
    value: name,
  },
  {
    title: 'Phone',
    value: phone,
  },
  {
    title: 'Email',
    value: email,
  },
  {
    title: 'Gender',
    value: gender,
  },
];
