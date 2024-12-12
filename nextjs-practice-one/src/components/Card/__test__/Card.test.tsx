import { render, screen, fireEvent } from '@testing-library/react';

// Components
import { Card } from '..';

describe('Card component', () => {
  const mockOnPress = jest.fn();

  const props = {
    name: 'John Doe',
    specialty: 'Dentist',
    experience: 5,
    rating: 4,
    imageSrc: '/images/doctor.webp',
    onPress: mockOnPress,
  };

  test('Should render Card with name, specialty, and experience', () => {
    render(<Card {...props} />);

    expect(screen.getByText('Dr John Doe')).toBeInTheDocument();
    expect(screen.getByText('Dentist')).toBeInTheDocument();
    expect(screen.getByText('5 Years')).toBeInTheDocument();
  });

  test('Should render button and call onPress when user clicked', () => {
    render(<Card {...props} />);

    const bookButton = screen.getAllByRole('button', { name: /book/i });
    expect(bookButton[0]).toBeInTheDocument();

    fireEvent.click(bookButton[0]);

    expect(mockOnPress).toHaveBeenCalled();
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
