import type { APIRequestResult } from '@/common/types';
import { JSON_ERROR } from '@/common/const';
import { APIError } from './error-handling/api-error';
import { CustomError } from './error-handling/custom-error';
import { errorHandler } from './error-handling/error-handler';

export const apiRequest = async <T>(url: string, config: RequestInit): Promise<APIRequestResult<T>> => {
  const res: APIRequestResult<T> = {
    ok: false,
    status: 0,
    data: {} as T,
    headers: {} as Headers,
  };

  try {
    const response = await fetch(url, config);

    res.ok = response.ok;
    res.status = response.status;

    if (!res.ok) throw new APIError(response.statusText, response.status);

    if (response.status !== 204) {
      res.headers = response.headers;
      const contentType = res.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        throw new CustomError(response.status, JSON_ERROR.code, JSON_ERROR.message);
      }

      res.data = await response.json();
    }
  } catch (error: unknown) {
    errorHandler(error);
  }
  return res;
};

export default apiRequest;
