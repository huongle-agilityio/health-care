import { generateImageBase64, toBase64 } from '..';
import { Buffer } from 'buffer';

if (typeof window === 'undefined') {
  globalThis.window = {
    btoa: (str: string) => Buffer.from(str).toString('base64'),
  } as Window & typeof globalThis;
}

describe('toBase64', () => {
  it('Should convert string to base64 in Node.js environment', () => {
    const input = 'Hello, World!';
    const result = toBase64(input);

    expect(result).toBe('SGVsbG8sIFdvcmxkIQ==');
  });

  it('Should convert string to base64 in browser environment', () => {
    const input = 'Hello, Browser!';
    const result = toBase64(input);

    expect(result).toBe(window.btoa(input));
  });
});

describe('generateImageBase64', () => {
  it('Should generate a valid base64 SVG image with correct width and height', () => {
    const width = 100;
    const height = 200;
    const base64Image = generateImageBase64(width, height);

    expect(base64Image.startsWith('data:image/svg+xml;base64,')).toBe(true);

    const encodedImage = base64Image.split(',')[1];
    const decodedImage = Buffer.from(encodedImage, 'base64').toString('utf-8');

    expect(decodedImage).toContain(`<svg width="${width}" height="${height}"`);
    expect(decodedImage).toContain(
      '<rect width="100" height="200" fill="#333" />',
    );
    expect(decodedImage).toContain(
      '<rect id="r" width="100" height="200" fill="url(#g)" />',
    );
    expect(decodedImage).toContain(
      '<animate xlink:href="#r" attributeName="x"',
    );
  });

  it('Should handle non-numeric width and height correctly', () => {
    const width = '150';
    const height = '300';
    const base64Image = generateImageBase64(width, height);

    expect(base64Image.startsWith('data:image/svg+xml;base64,')).toBe(true);

    const encodedImage = base64Image.split(',')[1];
    const decodedImage = Buffer.from(encodedImage, 'base64').toString('utf-8');

    expect(decodedImage).toContain(`<svg width="${width}" height="${height}"`);
  });
});
