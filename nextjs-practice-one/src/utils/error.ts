// Constants
import { ERROR_MESSAGES } from '@/constants';

/**
 * Get error message
 * @param error
 * @returns error message
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    return error.message;
  }

  return ERROR_MESSAGES.DEFAULT_API_ERROR;
};
