'use client';

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
        isAuthenticated: false,

        setAuthenticated: (isAuthenticated) => {
          set({ isAuthenticated });
        },

        setUser: (user) => {
          set(() => ({
            user,
          }));
        },

        logout: () => {
          sessionStorage.clear();
          set(() => ({
            user: null,
            isAuthenticated: false,
          }));
        },
      }),
      {
        name: LOCAL_STORAGE_KEYS.USER,
      },
    ),
  ),
);
