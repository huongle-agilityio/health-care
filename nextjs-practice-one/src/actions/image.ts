'use server';

// Constants
import { API_ENDPOINT, ERROR_MESSAGES } from '@/constants';

// Types
import { ImageResponse } from '@/types';

/**
 * Using fetch to upload an image instead httpClient because it have a different base URL.
 * Uploads an image file to the server and returns the server response.
 *
 * @param {File} file - The image file to be uploaded.
 * @returns {Promise<ImageResponse>} A promise that resolves to the server's response containing image data.
 * @throws Will throw an error if the server response is not ok.
 */
export const createImage = async (file: File): Promise<ImageResponse> => {
  const form = new FormData();
  form.append('image', file);

  const response = await fetch(API_ENDPOINT.IMAGE, {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.DEFAULT_API_ERROR);
  }

  const responseImage = await response.json();

  return responseImage;
};
