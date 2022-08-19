import type { API, APIRequestResult } from '@/common/types';
import { BASE } from '../common/const';
import { FetchMethod } from '../common/enums/fetch-methods';
import { apiRequest } from './api-request';

export class APIService<T> implements API<T> {
  constructor(private endpoint: string) {
    this.endpoint = `${BASE}/${endpoint}`;
  }

  public getAll(): Promise<APIRequestResult<T[]> | null> {
    const url = `${this.endpoint}`;
    const config: RequestInit = {
      method: FetchMethod.get,
    };

    return apiRequest(url, config);
  }

  public getPage(page: number, limit: number): Promise<APIRequestResult<T[]> | null> {
    const url = `${this.endpoint}?_page=${page}&_limit=${limit}`;
    const config: RequestInit = {
      method: FetchMethod.get,
    };

    return apiRequest(url, config);
  }

  public getById(id: string): Promise<APIRequestResult<T> | null> {
    const url = `${this.endpoint}/${id}`;
    const config: RequestInit = {
      method: FetchMethod.get,
    };

    return apiRequest(url, config);
  }

  public create(body: T): Promise<APIRequestResult<T> | null> {
    const url = `${this.endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const config: RequestInit = {
      method: FetchMethod.post,
      body: JSON.stringify(body),
      headers,
    };

    return apiRequest(url, config);
  }

  public updateById(id: string, body: T): Promise<APIRequestResult<T> | null> {
    const url = `${this.endpoint}/${id}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const config: RequestInit = {
      method: FetchMethod.put,
      body: JSON.stringify(body),
      headers,
    };

    return apiRequest(url, config);
  }

  public deleteById(id: string): Promise<APIRequestResult<T> | null> {
    const url = `${this.endpoint}/${id}`;
    const config: RequestInit = {
      method: FetchMethod.delete,
    };

    return apiRequest(url, config);
  }
}

export default APIService;
