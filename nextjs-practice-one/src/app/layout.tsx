import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { cookies } from 'next/headers';

// CSS
import './globals.css';

// Constants
import { BRAND, COOKIES_KEYS } from '@/constants';

// Components
import { Header } from '@/sections';

// Providers
import { Providers } from './providers';

const montserrat = Montserrat({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: BRAND.NAME,
  description: BRAND.APP_NAME,
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = (await cookies()).get(COOKIES_KEYS.TOKEN);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <Providers>
          <Header isAuthenticated={!!isAuthenticated} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
