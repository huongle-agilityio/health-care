import type { Meta, StoryObj } from '@storybook/react';

// Components
import { Toast } from '.';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['success', 'error', 'holder'],
    },
    placement: {
      control: 'inline-radio',
      options: ['left', 'right', 'none'],
    },
  },
  args: {
    placement: 'none',
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'holder',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
};
