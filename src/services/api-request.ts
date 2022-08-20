import { APIError } from './error-handling/api-error';
import { JSONError } from './error-handling/json-error';
import { errorHandler } from './error-handling/error-handler';
import type { APIRequestResult } from '../common/types';
import { JSON_ERROR, JSON_ERROR_CODE } from '../common/const';

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
        throw new JSONError(JSON_ERROR, JSON_ERROR_CODE);
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
