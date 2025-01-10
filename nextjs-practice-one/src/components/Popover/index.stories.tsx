import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

// Constants
import { ROUTES } from '@/constants';

// Components
import { Button } from '../Button';
import { Popover, PopoverProps } from '.';

// Mocks
import { SPECIALTIES } from '@/constants/mocks';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    menuOptions: SPECIALTIES,
    placement: {
      control: 'inline-radio',
      options: [
        'top',
        'bottom',
        'right',
        'left',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
    },
  },
} satisfies Meta<typeof Popover>;

const Template = (args: PopoverProps) => (
  <Popover {...args}>
    <Button>Toggle Popover</Button>
  </Popover>
);

export default meta;
export const Default = (args: PopoverProps) => <Template {...args} />;

Default.args = {
  placement: 'bottom-end',
  menuOptions: [
    {
      title: 'Setting',
      url: ROUTES.SETTING,
    },
    {
      title: 'Logout',
      action: fn(),
    },
  ],
};
