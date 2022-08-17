import { APIError } from './error-handling/api-error';
import { JSONError } from './error-handling/json-error';
import { errorHandler } from './error-handling/error-handler';
import type { APIRequestResult } from '../common/types';
import { JSON_ERROR, JSON_ERROR_CODE } from '../common/const';

export const apiRequest = async (url: string, config: RequestInit): Promise<APIRequestResult | null> => {
  try {
    const response = await fetch(url, config);

    const status = response.ok;

    if (!status) throw new APIError(response.statusText, response.status);

    const { headers } = response;
    const contentType = headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      throw new JSONError(JSON_ERROR, JSON_ERROR_CODE);
    }

    const res = await response.json();
    return {
      ok: response.ok,
      status: response.status,
      data: res,
      headers,
    };
  } catch (error: unknown) {
    errorHandler(error);
    return null;
  }
};

export default apiRequest;
