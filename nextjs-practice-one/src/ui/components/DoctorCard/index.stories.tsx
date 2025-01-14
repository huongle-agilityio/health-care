import type { Meta, StoryObj } from '@storybook/react';

// Components
import { DoctorCard } from '.';

// Mocks
import { cardMock } from '@/constants/mocks';

const meta = {
  title: 'Components/DoctorCard',
  component: DoctorCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: cardMock,
} satisfies Meta<typeof DoctorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
