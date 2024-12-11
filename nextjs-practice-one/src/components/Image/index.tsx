'use client';

import { useCallback, useState } from 'react';
import ImageNext, { ImageProps } from 'next/image';

// Constants
import { IMAGES } from '@/constants';

// Utils
import { cn, generateImageBase64 } from '@/utils';

interface OptimizedImageProps extends ImageProps {
  fallbackSrc?: string;
  classNameWrapper?: string;
  src: string;
  alt: string;
}

export const Image = ({
  fallbackSrc = IMAGES.FALLBACK_URL,
  blurDataURL,
  className,
  classNameWrapper,
  src,
  alt,
  ...props
}: OptimizedImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleError = useCallback(() => {
    setImgSrc(fallbackSrc);
  }, [fallbackSrc]);

  const handleLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  return (
    <div className={cn('relative overflow-hidden', classNameWrapper)}>
      <ImageNext
        fill
        src={imgSrc || fallbackSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        placeholder="blur"
        blurDataURL={blurDataURL || generateImageBase64(10, 10)}
        className={cn(
          'transition-opacity duration-300 ease-in-out',
          isImageLoaded ? 'opacity-100' : 'opacity-70',
          className,
        )}
        {...props}
      />
    </div>
  );
};
