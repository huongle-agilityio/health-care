import type { Preview } from '@storybook/react';
import { Montserrat } from 'next/font/google';

import '../src/app/globals.css';
import React from 'react';

const montserrat = Montserrat({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className={montserrat.className}>
        <Story />
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
