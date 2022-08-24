import useErrorModal from '@/stores/error-modal';
import { APIError } from './api-error';
import { CustomError } from './custom-error';

const { showErrorModal } = useErrorModal();

export const errorHandler = (error: unknown) => {
  if (error instanceof APIError) {
    showErrorModal(`ErrorCode (${error.statusCode}): ${error.message}`);
  } else if (error instanceof CustomError) {
    showErrorModal(`ErrorCode (${error.code}): ${error.message}`);
  } else {
    showErrorModal(`${error}`);
  }
};

export default errorHandler;
