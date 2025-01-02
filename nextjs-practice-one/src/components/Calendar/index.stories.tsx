import { useState } from 'react';
import { Meta } from '@storybook/react';
import { parseDate } from '@internationalized/date';
import { DateValue } from '@nextui-org/react';

// Components
import { Calendar, CalendarProps } from '.';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['md', 'lg'],
    },
    isDisabled: {
      control: 'boolean',
    },
    isInvalid: {
      control: 'boolean',
    },
  },
  args: {
    size: 'md',
    defaultValue: parseDate('2025-01-02'),
  },
} satisfies Meta<typeof Calendar>;

const Template = (args: CalendarProps) => {
  const [value, setValue] = useState<DateValue>(parseDate('2025-01-02'));

  const handleChange = (newDate: DateValue) => {
    setValue(newDate);
  };

  return <Calendar {...args} value={value} onChange={handleChange} />;
};

export default meta;
export const Default = (args: CalendarProps) => <Template {...args} />;
Default.args = {};

export const InValid = (args: CalendarProps) => <Template {...args} />;
InValid.args = {
  error: 'Invalid Date',
};

export const Disable = (args: CalendarProps) => <Template {...args} />;
Disable.args = {
  isDisabled: true,
};
