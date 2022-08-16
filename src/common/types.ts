export type APIRequestResult = {
  ok: boolean;
  status: number;
  data: unknown;
  headers: unknown;
};

export interface API {
  getAll(): Promise<APIRequestResult | null>;

  getSome(page: number, limit: number): Promise<APIRequestResult | null>;

  getById(id: number): Promise<APIRequestResult | null>;

  create(body: unknown): Promise<APIRequestResult | null>;

  updateById(id: number, body: unknown): Promise<APIRequestResult | null>;

  deleteById(id: number): Promise<APIRequestResult | null>;
}
