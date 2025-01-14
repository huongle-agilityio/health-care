export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  username?: string;
  phone: string;
}

export interface UserSession {
  id?: string;
  email: string;
  name: string;
  username?: string;
  phone: string;
  jwt?: string;
}
