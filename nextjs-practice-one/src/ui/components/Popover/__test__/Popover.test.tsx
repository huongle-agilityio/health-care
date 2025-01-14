import { act, render, screen, waitFor } from '@testing-library/react';
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

  it('Should render menu options when Popover is open', () => {
    render(<RenderPopover />);
    const user = userEvent.setup();

    act(async () => {
      await user.click(screen.getByText(/Toggle Popover/i));
    });

    waitFor(() => {
      mockMenuOptions.forEach(({ title }) => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });
  });
});
