import { render, screen } from '@testing-library/react';
import { parseDate } from '@internationalized/date';

// Components
import { Calendar } from '..';

describe('Calendar component', () => {
  const mockDate = parseDate('2024-12-11');

  test('renders the Calendar component correctly', () => {
    render(<Calendar value={mockDate} />);
    const calendarElement = screen.getByRole('grid');

    expect(calendarElement).toBeInTheDocument();
  });

  test('displays error message when error prop is provided', () => {
    render(<Calendar value={mockDate} error="Invalid Date" />);
    const errorMessage = screen.getByText(/invalid date/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
