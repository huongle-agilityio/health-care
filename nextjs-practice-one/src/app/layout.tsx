import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

// CSS
import './globals.css';

// Components
import Header from '@/layouts/Header';

// Providers
import { Providers } from './providers';

const montserrat = Montserrat({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'CareMate',
  description: 'Healthcare Application',
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
