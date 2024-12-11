import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Image } from '.';

const meta = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    classNameWrapper: {
      control: 'text',
    },
  },
  args: {
    src: '/images/dentist.webp',
    alt: 'Image',
    classNameWrapper: 'w-[400px] h-[200px]',
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    src: '/invalid-path/invalid-image.webp',
    alt: 'Fallback image',
  },
};

export const Blur: Story = {
  args: {
    src: '/images/large-image.webp',
    alt: 'Blur image',
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA\nAAAFCAYAAACNbyblAAAAHElEQVQI12P4\n//8/w38GIAXDIBKE0DHxgljNBAAO\n9TXL0Y4OHwAAAABJRU5ErkJggg==',
  },
};
