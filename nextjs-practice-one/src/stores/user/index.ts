'use client';

import { create } from 'zustand';
import Cookies from 'universal-cookie';
import { devtools, persist } from 'zustand/middleware';

// Types
import { UserStore } from './types';

// Constants
import { COOKIES_KEYS, LOCAL_STORAGE_KEYS, ROUTERS } from '@/constants';

const cookies = new Cookies();

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,

        setAuthenticated: (isAuthenticated) => {
          set({
            isAuthenticated: isAuthenticated,
          });
        },

        setUser: (user) => {
          set(() => ({
            user,
          }));
        },

        logout: () => {
          cookies.remove(COOKIES_KEYS.TOKEN, {
            path: ROUTERS.HOME,
          });
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
