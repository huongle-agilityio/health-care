import { render, screen } from '@testing-library/react';

// Components
import { Card } from '..';

// Mocks
import { cardMock } from '@/constants/mocks';

describe('Card component', () => {
  test('Should render Card with name, specialty, and experience', () => {
    render(<Card {...cardMock} />);

    expect(screen.getByText(`Dr ${cardMock.name}`)).toBeInTheDocument();
    expect(screen.getByText(cardMock.specialty)).toBeInTheDocument();
    expect(
      screen.getByText(`${cardMock.experience} Years`),
    ).toBeInTheDocument();
  });
});
