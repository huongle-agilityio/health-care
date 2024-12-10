import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { Input } from '.';

// Icons
import { StartIcon } from '@/icons';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    isDisabled: {
      control: 'boolean',
    },
    isInvalid: {
      control: 'boolean',
    },
  },
  args: {
    placeholder: 'Enter your name',
    size: 'md',
    label: 'Name',
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIconStart: Story = {
  args: {
    startContent: <StartIcon width="9" height="8" />,
  },
};

export const WithIconEnd: Story = {
  args: {
    endContent: <StartIcon width="9" height="8" />,
  },
};

export const InValid: Story = {
  args: {
    isInvalid: true,
    errorMessage: 'Have error',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
