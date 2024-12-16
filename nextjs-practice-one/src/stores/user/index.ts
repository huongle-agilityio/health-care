import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types
import { UserStore } from './types';

// Constants
import { LOCAL_STORAGE_KEYS } from '@/constants';

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => {
          set(() => ({
            user,
          }));
        },
        logout: () => {
          sessionStorage.clear();
          set(() => ({
            user: null,
          }));
        },
      }),
      {
        name: LOCAL_STORAGE_KEYS.USER,
      },
    ),
  ),
);
