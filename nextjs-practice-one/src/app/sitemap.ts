import { MetadataRoute } from 'next';

// Apis
import { getDoctors } from '@/actions';

// Constants
import { BASE_URL, ROUTERS } from '@/constants';

export const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { data: doctors } = await getDoctors();

  const bookingAppointmentsRoutes = doctors
    .map((doctor) => [
      {
        url: `${BASE_URL}${ROUTERS.BOOKING_APPOINTMENTS(doctor?.documentId || '')}`,
        lastModified: new Date(),
      },
    ])
    .flat();

  return [
    {
      url: `${BASE_URL}${ROUTERS.HOME}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTERS.LOGIN}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTERS.REGISTER}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTERS.APPOINTMENTS}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTERS.HEALTH_BLOG}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTERS.REVIEWS}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTERS.SETTING}`,
      lastModified: new Date(),
    },
    ...bookingAppointmentsRoutes,
  ];
};

export default sitemap;
