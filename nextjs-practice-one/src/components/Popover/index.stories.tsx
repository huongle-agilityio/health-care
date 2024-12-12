import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

// Constants
import { ROUTERS } from '@/constants';

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

const Template = (args: PopoverProps) => {
  return (
    <Popover {...args}>
      <Button>Toggle Popover</Button>
    </Popover>
  );
};

export default meta;
export const Default = (args: PopoverProps) => <Template {...args} />;

Default.args = {
  placement: 'bottom-end',
  menuOptions: [
    {
      label: 'Setting',
      url: ROUTERS.SETTING,
    },
    {
      label: 'Logout',
      action: fn(),
    },
  ],
};
