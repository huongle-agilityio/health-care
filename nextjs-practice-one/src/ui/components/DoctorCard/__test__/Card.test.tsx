import { render, screen } from '@testing-library/react';

// Components
import { DoctorCard } from '..';

// Mocks
import { cardMock } from '@/constants/mocks';

describe('DoctorCard component', () => {
  test('Should render DoctorCard with name, specialty, and experience', () => {
    render(<DoctorCard {...cardMock} />);

    expect(screen.getByText(`Dr ${cardMock.name}`)).toBeInTheDocument();
    expect(screen.getByText(cardMock.specialty)).toBeInTheDocument();
    expect(
      screen.getByText(`${cardMock.experience} Years`),
    ).toBeInTheDocument();
  });
});
