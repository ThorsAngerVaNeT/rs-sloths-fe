import type { API, APIRequestResult, GetList } from '@/common/types';
import { BASE } from '../common/const';
import { FetchMethod } from '../common/enums/fetch-methods';
import { apiRequest } from './api-request';

const credentials = 'include';

export class APIService<T> implements API<T> {
  constructor(private endpoint: string) {
    this.endpoint = `${BASE}/${endpoint}`;
  }

  public getAll(filter: string, sorting: string): Promise<APIRequestResult<GetList<T>> | null> {
    let param = filter ? `filter=${filter}` : '';
    param = sorting ? `${param}order=${sorting}` : '';
    param = param ? `?${param}` : '';

    const url = `${this.endpoint}${param}`;
    const config: RequestInit = {
      method: FetchMethod.get,
      credentials,
    };

    return apiRequest(url, config);
  }

  public getPage(
    page: number,
    limit: number,
    filter: string,
    sorting: string
  ): Promise<APIRequestResult<GetList<T>> | null> {
    let param = page ? `_page=${page}` : '';
    param = limit ? `${param}_limit=${limit}` : '';
    param = filter ? `${param}filter=${filter}` : '';
    param = sorting ? `${param}order=${sorting}` : '';
    param = param ? `?${param}` : '';

    const url = `${this.endpoint}${param}`;
    const config: RequestInit = {
      method: FetchMethod.get,
      credentials,
    };

    return apiRequest(url, config);
  }

  public getById(id: string): Promise<APIRequestResult<T> | null> {
    const url = `${this.endpoint}/${id}`;
    const config: RequestInit = {
      method: FetchMethod.get,
      credentials,
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
      credentials,
      body: JSON.stringify(body),
      headers,
    };

    return apiRequest(url, config);
  }

  public updateById(id: string, body: Partial<T>): Promise<APIRequestResult<Partial<T>> | null> {
    const url = `${this.endpoint}/${id}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const config: RequestInit = {
      method: FetchMethod.put,
      credentials,
      body: JSON.stringify(body),
      headers,
    };

    return apiRequest(url, config);
  }

  public update(body: Partial<T>): Promise<APIRequestResult<Partial<T>> | null> {
    const url = `${this.endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const config: RequestInit = {
      method: FetchMethod.put,
      credentials,
      body: JSON.stringify(body),
      headers,
    };

    return apiRequest(url, config);
  }

  public deleteById(id: string): Promise<APIRequestResult<T> | null> {
    const url = `${this.endpoint}/${id}`;
    const config: RequestInit = {
      method: FetchMethod.delete,
      credentials,
    };

    return apiRequest(url, config);
  }
}

export default APIService;
