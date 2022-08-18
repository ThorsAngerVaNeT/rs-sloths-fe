export type APIRequestResult = {
  ok: boolean;
  status: number;
  data: unknown;
  headers: unknown;
};

export interface API<T> {
  getAll(): Promise<APIRequestResult | null>;

  getPage(page: number, limit: number): Promise<APIRequestResult | null>;

  getById(id: string): Promise<APIRequestResult | null>;

  create(body: T): Promise<APIRequestResult | null>;

  updateById(id: string, body: T): Promise<APIRequestResult | null>;

  deleteById(id: string): Promise<APIRequestResult | null>;
}

export type Users = unknown;

export type Sloths = unknown;

export type MemoryLevel = {
  level: string;
  n: number;
};
