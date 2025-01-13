import { ChangeEvent, useState } from 'react';
import { ListCheckbox } from '..';

export default {
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
};

const Template: React.FC<{
  options: { value: string; label: string; isDisabled: boolean }[];
  selectedValue: string;
}> = (args) => {
  const [value, setValue] = useState(args.selectedValue);

  const onChange = (text: ChangeEvent<HTMLInputElement>) =>
    setValue(text.target.value);

  return <ListCheckbox {...args} selectedValue={value} onChange={onChange} />;
};

export const Default = Template.bind({});
