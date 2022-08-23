export type APIRequestResult<T> = {
  ok: boolean;
  status: number;
  data: T;
  headers: unknown;
};

export interface API<T> {
  getAll(): Promise<APIRequestResult<T[]> | null>;

  getPage(page: number, limit: number): Promise<APIRequestResult<T[]> | null>;

  getById(id: string): Promise<APIRequestResult<T> | null>;

  create(body: T): Promise<APIRequestResult<T> | null>;

  updateById(id: string, body: T): Promise<APIRequestResult<Partial<T>> | null>;

  deleteById(id: string): Promise<APIRequestResult<T> | null>;
}

export type Users = User[];
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
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
