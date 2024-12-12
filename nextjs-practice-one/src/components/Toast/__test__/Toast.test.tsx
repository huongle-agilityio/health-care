import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { Toast } from '..';

describe('Toast Component', () => {
  test('Should render with default props', () => {
    render(<Toast description="message" />);

    expect(screen.getByText(/oops, something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/message/i)).toBeInTheDocument();
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });

  test('Should render with success variant', () => {
    render(<Toast title="Success!" description="message" variant="success" />);

    expect(screen.getByText(/success!/i)).toBeInTheDocument();
    expect(screen.getByText(/message/i)).toBeInTheDocument();
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });

  test('Should render with error variant', () => {
    render(<Toast title="Error!" description="message" variant="error" />);

    expect(screen.getByText(/error!/i)).toBeInTheDocument();
    expect(screen.getByText(/message/i)).toBeInTheDocument();
    expect(screen.getByTestId('toast-close')).toBeInTheDocument();
  });

  test('Should call onClose user click close button', async () => {
    const mockOnClose = jest.fn();
    render(<Toast description="message" onClose={mockOnClose} />);

    const closeButton = screen.getByTestId('toast-close');
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
