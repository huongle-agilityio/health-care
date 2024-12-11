import { render, fireEvent, act } from '@testing-library/react';

// Components
import { Image } from '..';

// Constants
import { IMAGES } from '@/constants';

describe('Image component', () => {
  const blurDataURL = 'data:image/png;base64,...';

  test('Should render image with alt text', () => {
    const { getByAltText } = render(
      <Image
        classNameWrapper="w-[100px] h-[100px]"
        src="/test.jpg"
        alt="Test Image"
        fallbackSrc={IMAGES.FALLBACK_URL}
        blurDataURL={blurDataURL}
      />,
    );
    const image = getByAltText('Test Image');

    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toContain('_next/image');
  });

  test('Should render fallback image on error', () => {
    const { getByAltText } = render(
      <Image
        classNameWrapper="w-[100px] h-[100px]"
        src="/non-existing-image.jpg"
        alt="Fallback Image"
        fallbackSrc={IMAGES.FALLBACK_URL}
        blurDataURL={blurDataURL}
      />,
    );

    const image = getByAltText('Fallback Image');
    fireEvent.error(image);

    expect(image.getAttribute('src')).toContain('_next/image');
  });

  test('Should apply opacity effect when image loads', async () => {
    const { getByAltText } = render(
      <Image
        classNameWrapper="w-[100px] h-[100px]"
        src="/test.jpg"
        alt="Test Image"
        fallbackSrc={IMAGES.FALLBACK_URL}
        blurDataURL={blurDataURL}
      />,
    );

    const image = getByAltText('Test Image');
    expect(image).toHaveClass('opacity-70');

    await act(() => {
      fireEvent.load(image);
    });

    expect(image).toHaveClass('opacity-100');
  });
});
