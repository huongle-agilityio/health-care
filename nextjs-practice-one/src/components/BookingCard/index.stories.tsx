import type { Meta, StoryObj } from '@storybook/react';

// Components
import { BookingCard } from '.';

// Mocks
import { bookingCardMock } from '@/constants/mocks';

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
  args: bookingCardMock,
} satisfies Meta<typeof BookingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
