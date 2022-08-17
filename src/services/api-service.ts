import type { API } from '@/common/types';
import { BASE } from '../common/const';
import { FetchMethod } from '../common/enums/fetch-methods';
import { apiRequest } from './api-request';

export class APIService<T> implements API<T> {
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

  public getPage(page: number, limit: number) {
    const url = `${this.endpoint}?_page=${page}&_limit=${limit}`;
    const config = {
      method: FetchMethod.get,
    };

    return apiRequest(url, config);
  }

  public getById(id: string) {
    const url = `${this.endpoint}/${id}`;
    const config = {
      method: FetchMethod.get,
    };

    return apiRequest(url, config);
  }

  public create(body: T) {
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

  public updateById(id: string, body: T) {
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

  public deleteById(id: string) {
    const url = `${this.endpoint}/${id}`;
    const config = {
      method: FetchMethod.delete,
    };

    return apiRequest(url, config);
  }
}

export default APIService;
