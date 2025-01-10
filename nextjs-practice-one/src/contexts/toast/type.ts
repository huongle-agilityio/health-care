export interface Toast {
  title?: string;
  description: string;
  variant?: 'success' | 'error' | 'holder';
  duration?: number;
}

export interface Context {
  toast: Toast | null;
  showToast: (toast: Toast) => void;
  closeToast: (message?: string) => void;
}
