import { BASE } from '../common/const';
import { FetchMethod } from '../common/enums/fetch-methods';
import { apiRequest } from './api-request';

export class APIService {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${BASE}/${endpoint}`;
  }

  public getAll() {
    const url = `${this.endpoint}`;
    const config = {
      method: FetchMethod.get,
    };

    return apiRequest(url, config);
  }

  public getSome(page: number, limit: number) {
    const url = `${this.endpoint}?_page=${page}&_limit=${limit}`;
    const config = {
      method: FetchMethod.get,
    };

    return apiRequest(url, config);
  }

  public getById(id: number) {
    const url = `${this.endpoint}/${id}`;
    const config = {
      method: FetchMethod.get,
    };

    return apiRequest(url, config);
  }

  public createOne(body: unknown) {
    const url = `${this.endpoint}`;
    const config = {
      method: FetchMethod.post,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return apiRequest(url, config);
  }

  public updateById(id: number, body: unknown) {
    const url = `${this.endpoint}/${id}`;
    const config = {
      method: FetchMethod.put,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return apiRequest(url, config);
  }

  public deleteById(id: number) {
    const url = `${this.endpoint}/${id}`;
    const config = {
      method: FetchMethod.delete,
    };

    return apiRequest(url, config);
  }
}

export default APIService;
