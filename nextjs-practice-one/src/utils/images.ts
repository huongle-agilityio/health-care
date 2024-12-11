// Constants
import { BASE_URL } from '@/constants';

// Types
import { ImageResource } from '@/types';

const toBase64 = (value: string) =>
  typeof window === 'undefined'
    ? Buffer.from(value).toString('base64')
    : window.btoa(value);

/**
 * Generates a blurHash from an image
 * Refer: https://medium.com/@kavindumadushanka972/learn-how-to-create-dynamic-blur-data-urls-for-images-in-next-js-bc4eb5d04ec6
 * @param url - The url of the image
 * @returns The blurHash
 */
export const dynamicBlurDataUrl = async (url: string) => {
  const base64str = await fetch(
    // w is width of the image in pixels
    // q is image quality or compression level
    `${BASE_URL}/_next/image?url=${url}&w=16&q=75`,
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString('base64'),
  );

  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%'
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `;

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
};

/**
 * Modifying the image URLs object with blurHash data
 * @param {*} data - Array of image objects with `imgUrl` and `id`
 * @returns - Array of image objects with `imgUrl` and `blurHash` data
 */
export const getResources = async (data: ImageResource[]) => {
  const resources = await Promise.all(
    data.map(async (photo, index) => ({
      id: index.toString(),
      imgUrl: photo.imgUrl,
      blurHash: await dynamicBlurDataUrl(photo.imgUrl),
    })),
  );

  return resources;
};

/**
 * Generates a base64 image from a given width and height
 * @param width
 * @param height
 * @returns base64 string
 */
export const generateImageBase64 = (
  width: number | string,
  height: number | string,
) => {
  const convertImage = `
  <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="#333" />
    <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  return `data:image/svg+xml;base64,${toBase64(convertImage)}`;
};
