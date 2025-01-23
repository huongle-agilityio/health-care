import { NextRequest } from 'next/server';
import { z } from 'zod';
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

export interface APIRouteRequestProps<T, U> {
  request?: NextRequest;
  schema?: z.ZodType<U>;
  requestHandler: (payload: U) => Promise<T>;
}
