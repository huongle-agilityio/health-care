import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';

// Components
import { CheckboxController } from '..';

// Types
import { OptionCheckBox } from '@/types';

// Mock data for testing
const options: OptionCheckBox[] = [
  { label: 'Option 1', value: 'option1', isDisabled: false },
  { label: 'Option 2', value: 'option2', isDisabled: true },
  { label: 'Option 3', value: 'option3', isDisabled: true },
];

describe('CheckboxController Component', () => {
  const TestComponent = () => {
    const { control, clearErrors } = useForm();

    return (
      <CheckboxController
        options={options}
        name="checkbox"
        control={control}
        clearErrors={clearErrors}
      />
    );
  };

  test('Should checkbox options and handles change event', () => {
    render(<TestComponent />);

    const option1 = screen.getByLabelText('Option 1');

    expect(option1).toBeInTheDocument();

    fireEvent.click(option1);

    expect(option1).toBeChecked();
  });

  test('Should not select option when isDisabled is true', () => {
    render(<TestComponent />);

    const option2 = screen.getByLabelText('Option 2');

    expect(option2).toBeDisabled();
    expect(option2).toBeInTheDocument();
  });
});
