export type Role = 'Admin' | 'Editor' | 'Guest';

export interface User {
  id: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

