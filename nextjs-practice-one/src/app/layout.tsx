import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

// CSS
import './globals.css';

// Constants
import { BRAND } from '@/constants';

// Components
import { Header } from '@/layouts';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
