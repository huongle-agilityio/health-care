import { render, screen } from '@testing-library/react';

// Components
import { BookingCard } from '..';

// Mocks
import { bookingCardMock } from '@/constants/mocks';

describe('BookingCard', () => {
  it('Should render the BookingCard with correct data', () => {
    render(<BookingCard {...bookingCardMock} />);

    expect(screen.getByText(`Dr ${bookingCardMock.name}`)).toBeInTheDocument();
    expect(screen.getByText(bookingCardMock.date)).toBeInTheDocument();
    expect(screen.getByText(bookingCardMock.time)).toBeInTheDocument();
  });
});
