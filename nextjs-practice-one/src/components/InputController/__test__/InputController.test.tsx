import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

// Components
import { InputController } from '..';

describe('InputController Component', () => {
  const setup = () => {
    const mockClearErrors = jest.fn();

    const Wrapper = () => {
      const { control } = useForm({
        defaultValues: { test: '' },
      });

      return (
        <InputController
          label="Test Label"
          name="test"
          control={control}
          clearErrors={mockClearErrors}
        />
      );
    };

    render(<Wrapper />);

    return { mockClearErrors };
  };

  it('Should render the component with label and input', () => {
    setup();

    expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument();
  });

  it('Should update input value and calls clearErrors on change', async () => {
    const { mockClearErrors } = setup();
    const input = screen.getByLabelText(/Test Label/i);

    await userEvent.type(input, 'Hello');

    expect(input).toHaveValue('Hello');
    expect(mockClearErrors).toHaveBeenCalledTimes(5);
  });

  it('Should render error message when input invalid', async () => {
    const WrapperWithError = () => {
      const { control } = useForm({
        defaultValues: { test: '' },
      });

      return (
        <InputController
          label="Test Label"
          name="test"
          control={control}
          clearErrors={jest.fn()}
          isInvalid
          errorMessage="required"
        />
      );
    };

    render(<WrapperWithError />);

    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });
});
