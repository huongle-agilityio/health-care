import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import { Select } from '.';

// Icons
import { StartIcon } from '@/icons';

// Mocks
import { SPECIALTIES } from '@/constants/mocks';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: SPECIALTIES,
    isDisabled: {
      control: 'boolean',
    },
    isInvalid: {
      control: 'boolean',
    },
  },
  args: {
    classNames: { mainWrapper: 'w-[198px]' },
    'aria-label': 'select specialty',
    placeholder: 'Specialty',
    label: 'Specialty',
    options: SPECIALTIES,
    onChange: fn(),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    startContent: <StartIcon width="9" height="8" />,
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
