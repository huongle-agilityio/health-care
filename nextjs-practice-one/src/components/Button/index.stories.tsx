import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { Button } from '.';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    variant: {
      control: 'inline-radio',
      options: ['bordered', 'solid'],
    },
    color: {
      control: 'inline-radio',
      options: ['default', 'primary', 'bordered', 'danger', 'warning'],
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'md', 'lg'],
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Primary Button',
    variant: 'solid',
    color: 'default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'solid',
    color: 'primary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'bordered',
    color: 'bordered',
  },
};

export const Loading: Story = {
  args: {
    children: 'Outline Button',
    variant: 'solid',
    color: 'default',
    isLoading: true,
  },
};
