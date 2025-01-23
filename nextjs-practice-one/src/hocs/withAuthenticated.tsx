import { NextRequest } from 'next/server';

type ApiHandler<T> = (
  request: NextRequest,
  token: string,
  { params }: { params?: Promise<T> },
) => Promise<Response>;

/**
 * A HOC function that wraps an API handler with authentication.
 *
 * @param {ApiHandler<T>} handler The API handler to wrap.
 * @returns {ApiHandler<T>} The wrapped API handler.
 */
export const withAuthenticated = <T,>(handler: ApiHandler<T>) => {
  return async (request: NextRequest, { params }: { params: Promise<T> }) => {
    const token = request.headers.get('Authorization') || '';

    return handler(request, token, { params });
  };
};
