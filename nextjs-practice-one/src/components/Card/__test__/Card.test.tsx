import { render, screen } from '@testing-library/react';

// Components
import { Card } from '..';

describe('Card component', () => {
  const props = {
    name: 'John Doe',
    specialty: 'Dentist',
    experience: 5,
    rating: 4,
    imageSrc: '/images/doctor.webp',
    href: '/test',
  };

  test('Should render Card with name, specialty, and experience', () => {
    render(<Card {...props} />);

    expect(screen.getByText(/Dr John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Dentist/i)).toBeInTheDocument();
    expect(screen.getByText(/5 Years/i)).toBeInTheDocument();
  });
});
