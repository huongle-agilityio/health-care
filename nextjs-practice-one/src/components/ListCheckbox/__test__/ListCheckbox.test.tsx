import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// Components
import { ListCheckbox } from '..';

const mockOptions = [
  { value: 'option1', label: 'Option 1', isDisabled: false },
  { value: 'option2', label: 'Option 2', isDisabled: true },
];

const mockOnChange = jest.fn();

describe('ListCheckbox Component', () => {
  test('renders options correctly', () => {
    render(
      <ListCheckbox
        options={mockOptions}
        selectedValue="option1"
        onChange={mockOnChange}
        error=""
        className="custom-class"
      />,
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('handles onChange event', () => {
    render(
      <ListCheckbox
        options={mockOptions}
        selectedValue="option1"
        onChange={mockOnChange}
        error=""
        className="custom-class"
      />,
    );

    const checkboxOption1 = screen.getByText('Option 1');
    fireEvent.click(checkboxOption1);

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('disables the checkbox correctly', () => {
    render(
      <ListCheckbox
        options={mockOptions}
        selectedValue=""
        onChange={mockOnChange}
        error=""
        className="custom-class"
      />,
    );

    const checkboxOption2 = screen.getByLabelText('Option 2');

    expect(checkboxOption2).toBeDisabled();
  });

  test('displays error message when error prop is passed', () => {
    const errorMessage = 'This field is required';
    render(
      <ListCheckbox
        options={mockOptions}
        selectedValue=""
        onChange={mockOnChange}
        error={errorMessage}
        className="custom-class"
      />,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
