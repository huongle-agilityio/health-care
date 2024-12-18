import type { Meta, StoryObj } from '@storybook/react';

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
    href: '/test',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
