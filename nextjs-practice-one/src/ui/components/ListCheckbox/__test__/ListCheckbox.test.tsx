import { render, screen, fireEvent } from '@testing-library/react';

// Components
import { ListCheckbox } from '..';

// Mocks
import { ListCheckboxMock } from '@/constants/mocks';

const mockOnChange = jest.fn();

describe('ListCheckbox Component', () => {
  test('renders options correctly', () => {
    render(
      <ListCheckbox
        options={ListCheckboxMock}
        selectedValue="option1"
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText(ListCheckboxMock[0].label)).toBeInTheDocument();
    expect(screen.getByText(ListCheckboxMock[1].label)).toBeInTheDocument();
  });

  test('handles onChange event', () => {
    render(
      <ListCheckbox
        options={ListCheckboxMock}
        selectedValue="option1"
        onChange={mockOnChange}
      />,
    );

    const checkboxOption1 = screen.getByText(ListCheckboxMock[0].label);
    fireEvent.click(checkboxOption1);

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('disables the checkbox correctly', () => {
    render(
      <ListCheckbox
        options={ListCheckboxMock}
        selectedValue=""
        onChange={mockOnChange}
      />,
    );

    const checkboxOption2 = screen.getByLabelText(ListCheckboxMock[1].label);

    expect(checkboxOption2).toBeDisabled();
  });

  test('displays error message when error prop is passed', () => {
    const errorMessage = 'This field is required';
    render(
      <ListCheckbox
        options={ListCheckboxMock}
        selectedValue=""
        onChange={mockOnChange}
        error={errorMessage}
      />,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
