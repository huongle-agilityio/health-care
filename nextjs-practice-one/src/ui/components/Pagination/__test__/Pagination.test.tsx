import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

// Components
import { Pagination } from '..';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: jest.fn(
    () =>
      new URLSearchParams({
        search: '',
        page: '1',
        limit: '10',
      }),
  ),
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({ replace: jest.fn() })),
}));

describe('Pagination component', () => {
  test('Should render pagination with initial page and buttons', () => {
    const { getByText, getAllByText } = render(
      <Pagination page={2} total={10} />,
    );

    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();

    expect(getAllByText('1').length).toBe(1);
    expect(getByText('10')).toBeInTheDocument();
  });

  test('Should not decrement page below 1 when clicking Previous button', () => {
    render(<Pagination page={2} total={10} />);

    const prevButton = screen.getByText('Previous');

    userEvent.click(prevButton);

    waitFor(() => {
      expect(screen.getAllByText('1').length).toBe(1);
    });
  });

  test('Should not increment page above total when clicking Next button', () => {
    render(<Pagination page={9} total={10} />);

    const nextButton = screen.getByText('Next');

    userEvent.click(nextButton);

    waitFor(() => {
      expect(screen.getAllByText('10').length).toBe(1);
    });
  });
});
