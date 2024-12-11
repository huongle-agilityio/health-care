import { useEffect, useState } from 'react';

// Types
import { ImageResource } from '@/types';

// Utils
import { getResources } from '@/utils';

/**
 * Hook to modify the image URLs object with blurHash data
 * @param data - Array of image objects with `imgUrl` and `id`
 * @returns  - Array of image objects with `imgUrl`, `id` and `blurHash` data
 */
export const useImageResources = (data: ImageResource[]) => {
  const [imagesSet, setImagesSet] = useState<ImageResource[]>([]);

  useEffect(() => {
    const modifyData = async () => {
      const dataWithBlurHash = await getResources(data);
      setImagesSet(dataWithBlurHash);
    };

    modifyData();
  }, [data]);

  return imagesSet;
};
