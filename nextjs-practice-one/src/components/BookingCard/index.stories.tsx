import type { Meta, StoryObj } from '@storybook/react';

// Components
import { BookingCard } from '.';

const meta = {
  title: 'Components/BookingCard',
  component: BookingCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    time: {
      control: 'text',
    },
    imageSrc: {
      control: 'text',
    },
  },
  args: {
    date: '12/12/2024',
    name: 'Caitlyn',
    time: '09:00',
    imageSrc: '/images/dentist.webp',
  },
} satisfies Meta<typeof BookingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
