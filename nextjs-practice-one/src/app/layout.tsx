import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

// CSS
import './globals.css';

// Config
import { auth } from '@/config';

// Constants
import { BRAND, FAVICON_URL } from '@/constants';

// Components
import { Header } from '@/ui/sections';

// Providers
import { Providers } from './providers';

const montserrat = Montserrat({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: BRAND.NAME,
  description: BRAND.APP_NAME,
  icons: [
    {
      rel: 'icon',
      url: FAVICON_URL,
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  console.log('session', session);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <Providers>
          <Header isAuthenticated={isAuthenticated} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
