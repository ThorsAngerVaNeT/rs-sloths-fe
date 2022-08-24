import type { APIRequestResult } from '@/common/types';
import { JSON_ERROR } from '@/common/const';
import { APIError } from './error-handling/api-error';
import { CustomError } from './error-handling/custom-error';
import { errorHandler } from './error-handling/error-handler';

export const apiRequest = async <T>(url: string, config: RequestInit): Promise<APIRequestResult<T> | null> => {
  try {
    const response = await fetch(url, config);

    const isOk = response.ok;

    if (!isOk) throw new APIError(response.statusText, response.status);

    let data = <T>{};
    let headers = null;

    if (response.status !== 204) {
      headers = response.headers;
      const contentType = headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        throw new CustomError(JSON_ERROR);
      }

      data = await response.json();
    }

    const res: APIRequestResult<T> = {
      ok: isOk,
      status: response.status,
      data,
      headers,
    };

    return res;
  } catch (error: unknown) {
    errorHandler(error);
    return null;
  }
};

export default apiRequest;
