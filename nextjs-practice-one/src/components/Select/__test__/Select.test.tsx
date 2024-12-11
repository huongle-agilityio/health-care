import { render, fireEvent } from '@testing-library/react';

// Components
import { Select } from '..';

// Types
import { SPECIALTIES } from '@/constants/mocks';

describe('Select component', () => {
  test('Should render select with options', () => {
    const { getByText } = render(
      <Select value="1" options={SPECIALTIES} aria-label="Select specialty" />,
    );

    SPECIALTIES.forEach((option) => {
      expect(getByText(option.label)).toBeInTheDocument();
    });
  });

  test('Should render select with error message when input select is inValid', () => {
    const { getByText } = render(
      <Select
        value="1"
        options={SPECIALTIES}
        isInvalid
        errorMessage="error"
        aria-label="Select specialty"
      />,
    );

    expect(getByText('error')).toBeInTheDocument();
  });

  test('Should select an option when clicked', () => {
    const handleChange = jest.fn();
    const { getAllByText, getByRole } = render(
      <Select
        value="1"
        options={SPECIALTIES}
        onChange={handleChange}
        aria-label="Select specialty"
      />,
    );

    const select = getByRole('button');
    fireEvent.click(select);
    const option = getAllByText(SPECIALTIES[1].label);
    fireEvent.click(option[1]);

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange.mock.calls[0][0].target.value).toBe(
      SPECIALTIES[1].value,
    );
  });

  test('Should not call function handleChange when select input is disabled', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Select
        isDisabled
        options={SPECIALTIES}
        onChange={handleChange}
        aria-label="Select specialty"
      />,
    );

    const select = getByRole('button');
    fireEvent.click(select);

    expect(handleChange).not.toHaveBeenCalled();
  });
});
