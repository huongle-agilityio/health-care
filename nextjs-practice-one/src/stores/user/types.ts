import { User } from '@/types';

export interface UserState {
  user: User | null;
}

export interface UserStore extends UserState {
  setUser: (user: User) => void;
  logout: () => void;
}
