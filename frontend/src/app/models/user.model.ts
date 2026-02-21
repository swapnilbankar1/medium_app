export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  created_at: string;
}
