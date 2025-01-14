import { ChangeEvent, useState } from 'react';

import type { Meta } from '@storybook/react';

// Components
import { ListCheckbox, ListCheckboxProps } from '.';

const meta = {
  title: 'Components/ListCheckbox',
  component: ListCheckbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    options: [
      { value: 'option1', label: 'Option 1', isDisabled: false },
      { value: 'option2', label: 'Option 2', isDisabled: true },
      { value: 'option3', label: 'Option 3', isDisabled: false },
    ],
    selectedValue: 'option1',
  },
} satisfies Meta<typeof ListCheckbox>;

const Template = (args: ListCheckboxProps) => {
  const [value, setValue] = useState(args.selectedValue);

  const onChange = (text: ChangeEvent<HTMLInputElement>) =>
    setValue(text.target.value);

  return <ListCheckbox {...args} selectedValue={value} onChange={onChange} />;
};

export default meta;
export const Default = (args: ListCheckboxProps) => <Template {...args} />;
Default.args = {};
