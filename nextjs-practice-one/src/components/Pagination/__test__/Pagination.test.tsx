import { render, fireEvent } from '@testing-library/react';

// Components
import { Pagination } from '..';

describe('Pagination component', () => {
  test('Should render pagination with initial page and buttons', () => {
    const { getByText, getAllByText } = render(
      <Pagination page={1} total={10} onChange={jest.fn()} />,
    );

    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();

    expect(getAllByText('1').length).toBe(2);
    expect(getByText('10')).toBeInTheDocument();
  });

  test('Should call handlePrevPage and decrement page on Previous button click', () => {
    const { getByText, getAllByText } = render(
      <Pagination page={2} total={10} onChange={jest.fn()} />,
    );

    const prevButton = getByText('Previous');
    fireEvent.click(prevButton);

    expect(getAllByText('1').length).toBe(2);
  });

  test('Should call handleNextPage and increment page on Next button click', () => {
    const { getByText, getAllByText } = render(
      <Pagination page={1} total={10} onChange={jest.fn()} />,
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    expect(getAllByText('2').length).toBe(2);
  });

  test('Should not decrement page below 1 when clicking Previous button', () => {
    const { getByText, getAllByText } = render(
      <Pagination page={1} total={10} onChange={jest.fn()} />,
    );

    const prevButton = getByText('Previous');
    fireEvent.click(prevButton);

    expect(getAllByText('1').length).toBe(2);
  });

  test('Should not increment page above total when clicking Next button', () => {
    const { getByText, getAllByText } = render(
      <Pagination page={10} total={10} onChange={jest.fn()} />,
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    expect(getAllByText('10').length).toBe(2);
  });
});
