import { render, screen } from '@testing-library/react';

// Components
import { BookingCard } from '..';

describe('BookingCard', () => {
  const props = {
    date: '12/12/2024',
    name: 'John Doe',
    imageSrc: '/images/doctor.webp',
    time: '10:30',
  };

  it('Should render the BookingCard with correct data', () => {
    render(<BookingCard {...props} />);

    expect(screen.getByText(`Dr ${props.name}`)).toBeInTheDocument();
    expect(screen.getByText(props.date)).toBeInTheDocument();
    expect(screen.getByText(props.time)).toBeInTheDocument();
  });
});
