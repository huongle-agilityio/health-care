/**
 * Converts a string to a base64 encoded string.
 *
 * @param {string} value - The string to convert to a base64 encoded string.
 * @returns {string} A base64 encoded string representing the input string.
 */
export const toBase64 = (value: string) =>
  typeof window === 'undefined'
    ? Buffer.from(value).toString('base64')
    : window.btoa(value);

/**
 * Generates a base64 encoded SVG image with a gradient effect.
 *
 * @param {number|string} width The width of the image.
 * @param {number|string} height The height of the image.
 * @returns {string} A base64 encoded string representing the SVG image.
 */
export const generateImageBase64 = (
  width: number | string,
  height: number | string,
): string => {
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
