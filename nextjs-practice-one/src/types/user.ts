export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  username?: string;
  phone: string;
  gender?: boolean;
}

export interface UserPayload {
  identifier?: string;
  email: string;
  password: string;
  username?: string;
  phone?: string;
}

export interface UserResponse {
  jwt: string;
  user: User;
}
