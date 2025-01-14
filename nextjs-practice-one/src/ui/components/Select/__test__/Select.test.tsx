import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

// Components
import { Select } from '..';

// Types
import { SPECIALTIES } from '@/constants/mocks';

describe('Select component', () => {
  test('Should render select with options', () => {
    render(
      <Select
        value="dentist"
        options={SPECIALTIES}
        aria-label="Select specialty"
      />,
    );

    SPECIALTIES.forEach((option) => {
      expect(screen.getAllByText(option.label)[0]).toBeInTheDocument();
    });
  });

  test('Should render select with error message when input select is inValid', () => {
    render(
      <Select
        value="dentist"
        options={SPECIALTIES}
        isInvalid
        errorMessage="error"
        aria-label="Select specialty"
      />,
    );

    expect(screen.getByText('error')).toBeInTheDocument();
  });

  test('Should select an option when clicked', () => {
    const handleChange = jest.fn();
    render(
      <Select
        value="dentist"
        options={SPECIALTIES}
        onChange={handleChange}
        aria-label="Select specialty"
      />,
    );

    const select = screen.getByRole('button');
    userEvent.click(select);

    const option = screen.getAllByText(SPECIALTIES[1].label);
    userEvent.click(option[1]);

    waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
      expect(handleChange.mock.calls[0][0].target.value).toBe(
        SPECIALTIES[1].value,
      );
    });
  });

  test('Should not call function handleChange when select input is disabled', () => {
    const handleChange = jest.fn();
    render(
      <Select
        isDisabled
        options={SPECIALTIES}
        onChange={handleChange}
        aria-label="Select specialty"
      />,
    );

    const select = screen.getByRole('button');

    userEvent.click(select);

    waitFor(() => {
      expect(handleChange).not.toHaveBeenCalled();
    });
  });
});
