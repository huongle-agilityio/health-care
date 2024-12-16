import { useForm } from 'react-hook-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { CalendarController } from '..';

describe('CalendarController Component', () => {
  const setup = () => {
    const user = userEvent.setup();
    const mockClearErrors = jest.fn();

    const Wrapper = () => {
      const { control } = useForm({
        defaultValues: { date: '' },
      });

      return (
        <CalendarController
          name="date"
          control={control}
          clearErrors={mockClearErrors}
          error="Invalid date"
        />
      );
    };

    render(<Wrapper />);
    return { user, mockClearErrors };
  };

  it('Should render error message when have error', () => {
    setup();

    expect(screen.getByText(/Invalid date/i)).toBeInTheDocument();
  });
});
