'use server';

import { safeHttpRequest } from './safeHttpRequest';
import { createImage } from './image';

// Constants
import { API_ROUTE_ENDPOINT, BASE_URL, INIT_PAGINATION } from '@/constants';

// Services
import { httpClient } from '@/services';

// Types
import { User, UserPayload } from '@/types';

/**
 * Updates user information.
 *
 * @param {UserPayload} payload - The payload to update the user with.
 * @param {string} id - The id of the user to update.
 * @returns {Promise<{ data: User, meta: { pagination: ApiPagination } }>} A promise that resolves to an object containing the updated user information and pagination metadata.
 */
export const updateUserInformation = async (payload: UserPayload, id: string) =>
  safeHttpRequest<User>(async (token) => {
    const avatarUrl =
      typeof payload.avatar === 'string'
        ? payload.avatar
        : (await createImage(payload.avatar)).data.url;

    const response = await httpClient.put<User, UserPayload>({
      token,
      endpoint: `${API_ROUTE_ENDPOINT.USER}/${id}`,
      body: { ...payload, avatar: avatarUrl },
      options: {
        baseUrl: BASE_URL,
      },
    });

    return { data: response, meta: { pagination: INIT_PAGINATION } };
  }, true);
