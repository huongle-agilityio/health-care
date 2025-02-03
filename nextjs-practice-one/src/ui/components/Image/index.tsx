'use client';

import { memo, useEffect, useState } from 'react';
import ImageNext, { ImageProps } from 'next/image';

// Constants
import { IMAGES } from '@/constants';

// Utils
import { cn, generateImageBase64 } from '@/utils';

interface OptimizedImageProps extends ImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  classNameWrapper?: string;
}

export const Image = memo(
  ({
    src,
    alt,
    fallbackSrc = IMAGES.FALLBACK_URL,
    blurDataURL,
    className,
    classNameWrapper,
    ...props
  }: OptimizedImageProps) => {
    const [imgSrc, setImgSrc] = useState<string | undefined>(src);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleError = () => {
      setImgSrc(fallbackSrc);
    };

    const handleLoad = () => {
      setIsImageLoaded(true);
    };

    useEffect(() => {
      if (src) {
        setImgSrc(src);
      }
    }, [src]);

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
            'transition-opacity duration-300 ease-in-out object-cover',
            isImageLoaded ? 'opacity-100' : 'opacity-70',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Image.displayName = 'Image';
