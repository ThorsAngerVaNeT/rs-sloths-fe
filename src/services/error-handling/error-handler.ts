import { APIError } from './api-error';
import { JSONError } from './json-error';

export const errorHandler = (error: unknown) => {
  if (error instanceof APIError) {
    // todo
  } else if (error instanceof JSONError) {
    // todo
  } else {
    // todo
  }
};

export default errorHandler;
