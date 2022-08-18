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

  updateById(id: string, body: T): Promise<APIRequestResult<T> | null>;

  deleteById(id: string): Promise<APIRequestResult<T> | null>;
}

export type Users = unknown;

export type Sloths = {
  id: string;
  caption: string;
  description: string;
  image_url: string;
  rating: number;
  createdAt: number;
};
