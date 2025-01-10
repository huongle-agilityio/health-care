import { render, fireEvent } from '@testing-library/react';

// Components
import { Input } from '..';

describe('Input component', () => {
  test('Should render input with placeholder and label', () => {
    const { getByPlaceholderText, getByText } = render(
      <Input placeholder="Enter your name" label="Name" />,
    );

    const input = getByPlaceholderText('Enter your name');
    const label = getByText('Name');

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  test('Should call onChange function when user enters in input', () => {
    const handleChange = jest.fn();

    const { getByPlaceholderText } = render(
      <Input onChange={handleChange} placeholder="Enter your name" />,
    );

    const input = getByPlaceholderText('Enter your name');
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('Hello');
  });

  test('Should display error message when input is invalid', () => {
    const { getByText } = render(
      <Input placeholder="Email" isInvalid errorMessage="Invalid email" />,
    );

    const errorMessage = getByText('Invalid email');

    expect(errorMessage).toBeInTheDocument();
  });
});
