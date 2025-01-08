// Config
import { auth } from '@/config';

// Constants
import { ERROR_MESSAGES, INIT_PAGINATION } from '@/constants';

// Types
import { ApiPagination, ApiPaginationResponse } from '@/types';

// Utils
import { getErrorMessage } from '@/utils';

/**
 * Executes an HTTP request safely, handling authentication and errors.
 *
 * @template T - The type of data expected in the response.
 * @param {Function} request - A function that performs the HTTP request and returns a promise of the response.
 * @param {boolean} hasToken - Indicates whether a token is needed for the request.
 * @returns {Promise<Object>} An object containing the data, optional metadata, and any error encountered.
 *   - `data`: The response data, or an empty array if an error occurred.
 *   - `meta`: Optional metadata, including pagination information.
 *   - `error`: A string describing any error that occurred, or null if successful.
 */
export const safeHttpRequest = async <T>(
  request: (token?: string) => Promise<ApiPaginationResponse<T>>,
  hasToken: boolean = false,
): Promise<{
  data: T;
  meta?: {
    pagination: ApiPagination;
  };
  error: string | null;
}> => {
  try {
    const session = await auth();
    const token = session?.user?.jwt;

    if (hasToken && !token) {
      throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
    }

    const response = await request();

    return {
      data: response.data,
      meta: response.meta,
      error: null,
    };
  } catch (error) {
    return {
      data: [] as T,
      meta: { pagination: INIT_PAGINATION },
      error: getErrorMessage(error),
    };
  }
};
