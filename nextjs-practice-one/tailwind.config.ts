import { nextui } from '@nextui-org/react';

// Themes
import {
  borderRadius,
  colors,
  baseColors,
  fontFamily,
  fontSize,
  screens,
  spacing,
} from './src/themes';

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '24px',
      },
    },
    extend: {
      colors: {
        ...baseColors,
        ...colors,
      },
      screens,
      spacing,
      fontSize,
      fontFamily,
      borderRadius,
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors,
        },
        // custom dark themes
        dark: {},
      },
    }),
  ],
};
