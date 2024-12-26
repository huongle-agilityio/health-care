import { User } from '@/types';

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface UserStore extends UserState {
  setAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User) => void;
  logout: () => void;
}
