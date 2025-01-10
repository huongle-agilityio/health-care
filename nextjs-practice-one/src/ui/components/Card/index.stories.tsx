import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Card } from '.';

// Mocks
import { cardMock } from '@/constants/mocks';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: cardMock,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
