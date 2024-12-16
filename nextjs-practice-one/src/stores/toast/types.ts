export type Toast = {
  title?: string;
  description: string;
  variant?: 'success' | 'error' | 'holder';
  duration?: number;
};

export type ToastStore = {
  toast: Toast | null;
  showToast: (toast: Toast) => void;
  closeToast: () => void;
};
