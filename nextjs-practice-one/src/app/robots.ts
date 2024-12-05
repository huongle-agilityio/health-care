import { MetadataRoute } from 'next';

// Constants
import { DOMAIN } from '@constants';

export const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: `${DOMAIN}/sitemap.xml`,
});

export default robots;
