import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';

// Components
import { SelectController } from '..';

// Mocks
import { SPECIALTIES } from '@/constants/mocks';

describe('SelectController', () => {
  const setup = () => {
    const user = userEvent.setup();
    const mockClearErrors = jest.fn();

    const Wrapper = () => {
      const { control } = useForm({
        defaultValues: { select: '' },
      });

      return (
        <SelectController
          name="select"
          control={control}
          clearErrors={mockClearErrors}
          options={SPECIALTIES}
          label="Specialty"
          aria-label="Select Label"
        />
      );
    };

    render(<Wrapper />);
    return { user, mockClearErrors };
  };

  it('renders the Select component', () => {
    setup();
    expect(screen.getAllByText(/Specialty/i)[0]).toBeInTheDocument();
  });
});
