import React from 'react';
import type { Preview } from '@storybook/react';
import { Montserrat } from 'next/font/google';

// Providers
import { Providers } from '../src/app/providers';

// CSS
import '../src/app/globals.css';

const montserrat = Montserrat({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={montserrat.className}>
        <Providers>
          <Story />
        </Providers>
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
