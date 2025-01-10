import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

// Types
import { Context, Toast } from './type';

const initState = {
  toast: null,
  showToast: () => {},
  closeToast: () => {},
};

export const ToastContext = createContext<Context>(initState);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  // Function show toast
  const showToast = useCallback((toast: Toast) => {
    setToast({ variant: 'error', ...toast });
  }, []);

  // Function close toast
  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  const value = useMemo(
    () => ({
      toast,
      showToast,
      closeToast,
    }),
    [toast, showToast, closeToast],
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
