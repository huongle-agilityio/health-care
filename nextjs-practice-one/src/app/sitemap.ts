import { MetadataRoute } from 'next';

// Apis
import { getDoctors } from '@/actions';

// Constants
import { BASE_URL, ROUTES } from '@/constants';

export const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { data: doctors } = await getDoctors();

  const bookingAppointmentsRoutes = doctors
    .map((doctor) => [
      {
        url: `${BASE_URL}${ROUTES.BOOKING_APPOINTMENTS_DETAIL(doctor?.documentId || '')}`,
        lastModified: new Date(),
      },
    ])
    .flat();

  return [
    {
      url: `${BASE_URL}${ROUTES.HOME}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTES.LOGIN}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTES.REGISTER}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTES.APPOINTMENTS}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTES.HEALTH_BLOG}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTES.REVIEWS}`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}${ROUTES.SETTING}`,
      lastModified: new Date(),
    },
    ...bookingAppointmentsRoutes,
  ];
};

export default sitemap;
