export type SafeUser = {
    id: number;
    email: string;
    name: string | null;
    createdAt: Date;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user?: {
    email: string;
    name: string | null;
  };
  token?: string;
  message?: string;
  error?: unknown;
};

export type RegisterInput = {
  email: string;
  password: string;
  name: string;
};

export type RegisterResponse = {
  user?: {
    id: number;
    email: string;
    name: string | null;
    createdAt: Date;
  };
  message?: string;
  error?: unknown;
};