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
import { cn } from '@/utils';
import { getUserFromSession } from '@/utils/auth';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { name } = await getUserFromSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(montserrat.className, 'overflow-y-scroll')}>
        <Providers>
          <Header name={name} />
          <ToastWrapper>{children}</ToastWrapper>
        </Providers>
      </body>
    </html>
  );
}
