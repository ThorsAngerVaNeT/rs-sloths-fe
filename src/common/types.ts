import type { Role } from './enums/user-role';

export type APIRequestResult<T> = {
  ok: boolean;
  status: number;
  data: T;
  headers: Headers;
};

export type GetList<T> = {
  count: number;
  items: T[];
};

export interface API<T> {
  getAll(): Promise<APIRequestResult<GetList<T>>>;

  getPage(page: number, limit: number): Promise<APIRequestResult<GetList<T>>>;

  getById(id: string): Promise<APIRequestResult<T>>;

  create(body: T): Promise<APIRequestResult<T>>;

  updateById(id: string, body: T): Promise<APIRequestResult<Partial<T>>>;

  deleteById(id: string): Promise<APIRequestResult<T>>;
}

export type Users = User[];
export type User = {
  id: string;
  name: string;
  github: string;
  avatar_url: string;
  createdAt: Date;
  role: Role;
};

export type Sloths = Sloth[];
export type Sloth = {
  id: string;
  caption: string;
  description: string;
  image_url: string;
  rating: number;
  createdAt: number;
};

export type SlothRating = {
  slothId: string;
  userId: string;
  rate: number;
};

export type MemoryLevel = {
  level: string;
  n: number;
};

export type ErrorDescription = {
  code: string;
  message: string;
};
