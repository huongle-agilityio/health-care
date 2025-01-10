export const baseColors = {
  transparent: 'transparent',
  green: {
    100: '#0e2515',
    200: '#1c4a2a',
    300: '#439c5e',
    400: '#e0e8e0',
    500: '#f8fcf9',
  },
  black: {
    100: '#464c48',
    200: '#8c8c8c',
  },
  white: {
    100: '#fff',
  },
  gray: {
    100: '#f5f5f5',
    200: '#efefef',
    300: '#dedede',
  },
  brown: {
    100: '#c6b09a',
    200: '#c2b1a1',
  },
  orange: {
    100: '#db944b',
  },
  red: {
    50: '#fee2e2',
    100: '#ef4444',
  },
};

export const colors = {
  background: {
    '100': baseColors.white[100],
    '200': baseColors.green[500],
    '300': baseColors.brown[100],
    '400': baseColors.black[100],
    '500': baseColors.gray[100],
  },
  primary: {
    '100': baseColors.green[200],
    '200': baseColors.green[300],
    '300': baseColors.green[100],
    '400': baseColors.black[200],
    '500': baseColors.white[100],
  },
  secondary: {
    '100': baseColors.green[400],
    '200': baseColors.gray[300],
    '300': baseColors.brown[200],
    '400': baseColors.gray[200],
  },
  warning: {
    '100': baseColors.orange[100],
  },
  danger: {
    '100': baseColors.red[100],
    '200': baseColors.red[50],
  },
};
