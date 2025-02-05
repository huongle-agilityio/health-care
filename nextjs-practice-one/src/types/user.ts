import { ApiPaginationResponse } from './api';

// Constants
import { USER_ROLE } from '@/constants';

export interface UserRole {
  documentId: string;
  name?: USER_ROLE;
}

export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  avatar: string | File;
  username?: string;
  phone: string;
  role?: UserRole;
}

export type UserPayload = Pick<User, 'email' | 'name' | 'phone' | 'avatar'>;

export interface UserSession {
  isAdmin?: boolean;
  isCustomer?: boolean;
  id?: string;
  email: string;
  name: string;
  username?: string;
  avatar: string;
  phone: string;
  jwt?: string;
  role?: UserRole;
}

export type UsersResponse = ApiPaginationResponse<User>;
