import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { Card } from '.';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: 'Caitlyn',
    specialty: 'Dentist',
    experience: 2,
    rating: 4,
    imageSrc: '/images/dentist.webp',
    onPress: fn(),
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
