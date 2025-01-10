import { render } from '@testing-library/react';

// Components
import { Rating } from '..';

describe('Rating component', () => {
  test('Should render the correct number stars', () => {
    const { getAllByTestId } = render(<Rating value={3} max={5} />);

    const starts = getAllByTestId('star-icon');
    const outlinedStars = getAllByTestId('outlined-star-icon');

    expect(starts.length).toBe(3);
    expect(outlinedStars.length).toBe(2);
  });

  test('Should render full filled stars if value more than max value', () => {
    const { getAllByTestId } = render(<Rating value={6} />);

    const stars = getAllByTestId('star-icon');

    expect(stars.length).toBe(5);
  });

  test('Should handle decimal values for value and max', () => {
    const { getAllByTestId } = render(<Rating value={3.7} max={5.2} />);

    const filledStars = getAllByTestId('star-icon');
    const outlinedStars = getAllByTestId('outlined-star-icon');

    // 3.7 -> 4 filled stars and 5.2 -> max 5
    expect(filledStars.length + outlinedStars.length).toBe(5);
    expect(filledStars.length).toBe(4);
    expect(outlinedStars.length).toBe(1);
  });
});
