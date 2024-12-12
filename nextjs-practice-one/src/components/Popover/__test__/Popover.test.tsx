import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { Popover, PopoverProps } from '..';

describe('Popover Component', () => {
  const mockMenuOptions = [
    { title: 'Option 1', action: jest.fn() },
    { title: 'Option 2', action: jest.fn(), url: 'https://example.com' },
  ];

  const RenderPopover = (props?: Partial<PopoverProps>) => (
    <Popover placement="bottom-end" menuOptions={mockMenuOptions} {...props}>
      <button>Toggle Popover</button>
    </Popover>
  );

  it('Should render the button', () => {
    render(<RenderPopover />);

    expect(screen.getByText(/Toggle Popover/i)).toBeInTheDocument();
  });

  it('Should render menu options when Popover is open', async () => {
    render(<RenderPopover />);

    const user = userEvent.setup();
    await user.click(screen.getByText(/Toggle Popover/i));

    mockMenuOptions.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('Should call the action function when an option without a URL is clicked', async () => {
    render(<RenderPopover />);

    const user = userEvent.setup();
    await user.click(screen.getByText(/Toggle Popover/i));
    const option = screen.getByText('Option 1');
    await user.click(option);

    expect(mockMenuOptions[0].action).toHaveBeenCalledTimes(1);
  });

  it('Should not call the action function for options with a URL', async () => {
    render(<RenderPopover />);

    const user = userEvent.setup();
    await user.click(screen.getByText(/Toggle Popover/i));
    const linkOption = screen.getByText('Option 2');

    expect(linkOption.closest('a')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('Should close the Popover after clicking an option', async () => {
    render(<RenderPopover />);

    const user = userEvent.setup();
    await user.click(screen.getByText(/Toggle Popover/i));
    const option = screen.getByText('Option 1');

    await act(async () => {
      await user.click(option);
    });

    await waitFor(() => {
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });
});
