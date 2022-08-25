import useAlertModal from '@/stores/alert-modal';
import { APIError } from './api-error';
import { CustomError } from './custom-error';

const { showAlertModal } = useAlertModal();

export const errorHandler = (error: unknown) => {
  if (error instanceof APIError) {
    showAlertModal('modal.header.error', `ErrorCode (${error.statusCode}): ${error.message}`);
  } else if (error instanceof CustomError) {
    showAlertModal('modal.header.error', `ErrorCode (${error.code}): ${error.message}`);
  } else {
    showAlertModal('modal.header.error', `${error}`);
  }
};

export default errorHandler;
