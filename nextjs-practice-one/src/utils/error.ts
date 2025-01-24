// Constants
import { ERROR_MESSAGES } from '@/constants';

/**
 * Gets the error message from an error object or instance.
 *
 * @param {any} error
 * @returns {string} The error message.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    return error.message;
  } else if (typeof error === 'string') {
    return error;
  }

  return ERROR_MESSAGES.DEFAULT_API_ERROR;
};
