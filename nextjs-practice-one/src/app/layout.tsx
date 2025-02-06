import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

// CSS
import './globals.css';

// Constants
import { BASE_URL, BRAND, FAVICON_URL, IMAGES } from '@/constants';

// Components
import { Header, ToastWrapper } from '@/ui/sections';

// Providers
import { Providers } from './providers';

// Utils
import { getUserFromSession } from '@/utils/auth';
import { auth } from '@/config';

const montserrat = Montserrat({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL || ''),
  title: BRAND.NAME,
  description: BRAND.APP_DESCRIPTION,
  icons: [
    {
      rel: 'icon',
      url: FAVICON_URL,
    },
  ],
  openGraph: {
    images: [IMAGES.HERO_SECTION],
  },
};

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const session = await auth();
  const {
    name,
    avatar,
    role: { name: userRole },
  } = await getUserFromSession();

  return (
    <html lang="en" suppressHydrationWarning className="overflow-y-scroll">
      <body className={montserrat.className}>
        <Providers session={session}>
          <Header name={name} avatar={avatar} userRole={userRole} />
          <ToastWrapper>{children}</ToastWrapper>
        </Providers>
      </body>
    </html>
  );
}
