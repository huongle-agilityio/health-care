import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Text } from '.';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variants: {
      control: 'inline-radio',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
    },
    color: {
      control: 'inline-radio',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'light',
        'holder',
        'success',
        'error',
        'warning',
      ],
    },
    size: {
      control: 'inline-radio',
      options: ['2xs', 'xs', 'base', 'xl', '2xl', '3xl', '4xl'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Text',
    color: 'tertiary',
    size: 'base',
    variants: 'p',
  },
};
