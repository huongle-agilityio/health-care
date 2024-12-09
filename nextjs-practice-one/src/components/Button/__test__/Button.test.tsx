import { fireEvent, render, screen } from '@testing-library/react';

// Components
import { Button } from '..';

describe('Button component', () => {
  test('Should render button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('Should call function onPress when user click button', () => {
    const handlePress = jest.fn();
    const { getByRole } = render(
      <Button onPress={handlePress}>Click me</Button>,
    );
    const button = getByRole('button');
    fireEvent.click(button);

    expect(handlePress).toHaveBeenCalled();
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  test('Should not call function onPress when isLoading is true', () => {
    const handlePress = jest.fn();
    const { getByRole } = render(
      <Button onPress={handlePress} isLoading>
        Click me
      </Button>,
    );
    const button = getByRole('button');
    fireEvent.click(button);

    expect(handlePress).not.toHaveBeenCalled();
    expect(handlePress).toHaveBeenCalledTimes(0);
  });

  test('Should not call function onPress when isDisabled is true', () => {
    const handlePress = jest.fn();
    const { getByRole } = render(
      <Button onPress={handlePress} isDisabled>
        Click me
      </Button>,
    );
    const button = getByRole('button');
    fireEvent.click(button);

    expect(handlePress).not.toHaveBeenCalled();
    expect(handlePress).toHaveBeenCalledTimes(0);
  });
});
