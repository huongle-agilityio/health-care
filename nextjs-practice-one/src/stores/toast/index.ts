import { create } from 'zustand';

// Types
import { ToastStore } from './types';

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,
  showToast: (toast) => {
    const newToast = { variant: 'error' as const, ...toast };

    set(() => ({
      toast: newToast,
    }));
  },

  closeToast: () => {
    set(() => ({
      toast: null,
    }));
  },
}));
