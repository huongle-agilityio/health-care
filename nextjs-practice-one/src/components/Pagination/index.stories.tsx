import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Pagination } from '.';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    page: 2,
    total: 10,
    onChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
