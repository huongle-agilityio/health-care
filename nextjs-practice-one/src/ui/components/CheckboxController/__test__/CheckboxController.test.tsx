import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';

// Components
import { CheckboxController } from '..';

// Mocks
import { ListCheckboxMock } from '@/constants/mocks';

describe('CheckboxController Component', () => {
  const TestComponent = () => {
    const { control, clearErrors } = useForm();

    return (
      <CheckboxController
        options={ListCheckboxMock}
        name="checkbox"
        control={control}
        clearErrors={clearErrors}
      />
    );
  };

  test('Should checkbox options and handles change event', () => {
    render(<TestComponent />);

    const option1 = screen.getByLabelText(ListCheckboxMock[0].label);

    expect(option1).toBeInTheDocument();

    fireEvent.click(option1);

    expect(option1).toBeChecked();
  });

  test('Should not select option when isDisabled is true', () => {
    render(<TestComponent />);

    const option2 = screen.getByLabelText(ListCheckboxMock[1].label);

    expect(option2).toBeDisabled();
    expect(option2).toBeInTheDocument();
  });
});
