// Components
import { Text } from '..';

// Icons
import { CloseIcon } from '@/icons';

// Utils
import { cn } from '@/utils';

const TOAST_PLACEMENTS = {
  left: 'fixed bottom-15 right-8',
  right: 'fixed bottom-15 right-8',
  none: '',
};

const TOAST_COLORS = {
  success: 'bg-secondary-100 border-primary-200',
  error: 'bg-danger-50 border-danger-100',
  holder: 'bg-background-500 border-secondary-200',
};

const TOAST_ICON_COLORS = {
  success: 'fill-lime-600',
  error: 'fill-red-400',
  holder: 'fill-primary-400',
};

interface ToastProps {
  title?: string;
  description: string;
  placement?: 'left' | 'right' | 'none';
  variant?: 'success' | 'error' | 'holder';
  onClose?: () => void;
}

export const Toast = ({
  title = 'Oops, something went wrong',
  description,
  variant = 'holder',
  placement = 'right',
  onClose,
}: ToastProps) => (
  <div
    className={cn(
      'max-w-[400px]',
      'p-10 rounded-xl shadow-lg transition-transform duration-300 transform',
      'border-1 text-primary-400',
      TOAST_COLORS[variant],
      TOAST_PLACEMENTS[placement],
    )}
  >
    <div className="flex justify-between min-w-[320px]">
      <div className="flex flex-col gap-2">
        <Text size="xl" color={variant}>
          {title}
        </Text>
        <Text size="xs" color={variant}>
          {description}
        </Text>
      </div>
      <div data-testid="toast-close" onClick={onClose}>
        <CloseIcon
          size="14"
          className={cn('cursor-pointer', TOAST_ICON_COLORS[variant])}
        />
      </div>
    </div>
  </div>
);
