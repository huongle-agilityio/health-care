// Config
import { auth } from '@/config';

// Constants
import { INIT_USER_SESSION } from '@/constants/mocks';

// Types
import { UserSession } from '@/types';

/**
 * Gets the user from the session.
 *
 * @returns A promise that resolves to the user, or an empty object if the user is not logged in.
 */
export const getUserFromSession = async (): Promise<Required<UserSession>> => {
  const session = await auth();

  return { ...INIT_USER_SESSION, ...session?.user };
};
