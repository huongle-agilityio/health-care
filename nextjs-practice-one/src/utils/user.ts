import { ListInfo } from '@/types';

/**
 * Formats user information into an array of ListInfo objects.
 *
 * @param {Object} userInfo - The user information to format.
 * @param {string} userInfo.name - The user's name.
 * @param {string} userInfo.phone - The user's phone number.
 * @param {string} userInfo.email - The user's email address.
 * @returns {ListInfo[]} An array of formatted ListInfo objects.
 */
export const formatUserInfo = ({
  name,
  phone,
  email,
}: {
  name: string;
  phone: string;
  email: string;
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
];
