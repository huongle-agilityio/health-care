import { render } from '@testing-library/react';

// Components
import { Text } from '..';

describe('Text component', () => {
  test('Should render text with children', () => {
    const { getByText } = render(<Text>Text</Text>);

    expect(getByText('Text')).toBeInTheDocument();
  });

  test('Should render with correct tag based on the variants prop', () => {
    const { getByText } = render(<Text variants="h1">Text</Text>);
    const element = getByText('Text');

    expect(element.tagName).toBe('H1');
  });

  test('Should apply correct color class based on color prop', () => {
    const { getByText } = render(<Text color="success">Success</Text>);
    const element = getByText('Success');

    expect(element).toHaveClass('text-lime-600');
  });

  test('Should apply correct size class based on size prop', () => {
    const { getByText } = render(<Text size="xl">Large</Text>);
    const element = getByText('Large');

    expect(element).toHaveClass('text-xl');
  });

  test('Should apply custom styles if styles prop is provided', () => {
    const { getByText } = render(<Text className="custom-styles">Styled</Text>);
    const element = getByText('Styled');

    expect(element).toHaveClass('custom-styles');
  });
});
