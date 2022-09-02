import type { API, APIRequestResult, GetList, Options } from '@/common/types';
import { BASE } from '../common/const';
import { FetchMethod } from '../common/enums/fetch-methods';
import { apiRequest } from './api-request';

const credentials = 'include';

const makeParamString = (options: Options) => {
  let url = `?`;

  Object.keys(options).forEach((key) => {
    if (options[key]) url += `${key}=${options[key]}&`;
  });

  return url.slice(0, -1);
  // return `?${new URLSearchParams(options)}`;
};

export class APIService<T> implements API<T> {
  constructor(private endpoint: string) {
    this.endpoint = `${BASE}/${endpoint}`;
  }

  public getAllList(): Promise<APIRequestResult<T[]>> {
    const url = `${this.endpoint}`;
    const config: RequestInit = {
      method: FetchMethod.get,
      credentials,
    };

    return apiRequest(url, config);
  }

  public getAll(filter: string, order: string): Promise<APIRequestResult<GetList<T>>> {
    const param = makeParamString({
      filter,
      order,
    });

    const url = `${this.endpoint}${param}`;
    const config: RequestInit = {
      method: FetchMethod.get,
      credentials,
    };

    return apiRequest(url, config);
  }

  public getPage(page: number, limit: number, filter: string, order: string): Promise<APIRequestResult<GetList<T>>> {
    const param = makeParamString({
      page: page.toString(),
      limit: limit.toString(),
      filter,
      order,
    });

    const url = `${this.endpoint}${param}`;
    const config: RequestInit = {
      method: FetchMethod.get,
      credentials,
    };

    return apiRequest(url, config);
  }

  public getById(id: string): Promise<APIRequestResult<T>> {
    const url = `${this.endpoint}/${id}`;
    const config: RequestInit = {
      method: FetchMethod.get,
      credentials,
    };

    return apiRequest(url, config);
  }

  public create(body: T): Promise<APIRequestResult<T>> {
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

  public createImage(body: FormData): Promise<APIRequestResult<T>> {
    const url = `${this.endpoint}`;
    const config: RequestInit = {
      method: FetchMethod.post,
      credentials,
      body,
    };

    return apiRequest(url, config);
  }

  public updateById(id: string, body: Partial<T>): Promise<APIRequestResult<Partial<T>>> {
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

  public updateByIdAndImage(id: string, body: FormData): Promise<APIRequestResult<Partial<T>>> {
    const url = `${this.endpoint}/${id}`;
    const config: RequestInit = {
      method: FetchMethod.put,
      credentials,
      body,
    };

    return apiRequest(url, config);
  }

  public update(body: Partial<T>): Promise<APIRequestResult<Partial<T>>> {
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

  public deleteById(id: string): Promise<APIRequestResult<T>> {
    const url = `${this.endpoint}/${id}`;
    const config: RequestInit = {
      method: FetchMethod.delete,
      credentials,
    };

    return apiRequest(url, config);
  }
}

export default APIService;
