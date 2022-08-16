import { APIError } from './error-handling/api-error';
import { JSONError } from './error-handling/json-error';
import { errorHandler } from './error-handling/error-handler';
import type { APIRequestResult } from '../common/types';

export const apiRequest = async (url: string, config: RequestInit): Promise<APIRequestResult | null> => {
  try {
    const response = await fetch(url, config);

    const status = response.ok;

    if (!status) throw new APIError(response.statusText, response.status);

    const { headers } = response;
    const contentType = headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      throw new JSONError('Response is not a JSON!', 'NOT_JSON');
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
