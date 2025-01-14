import { User } from './user';

export interface AuthPayload {
  identifier?: string;
  email: string;
  password: string;
  username?: string;
  phone?: string;
}

export interface AuthResponse {
  jwt?: string;
  user: User;
}
