import { GenericSuccessResPayload } from './types';

export const getErrResObj = (errorMessage: string, e: unknown = null) => ({
  status: 'error',
  error: errorMessage,
  e: e?.toString(),
});

export const getSuccessResObj = (
  message?: string,
  data?: any,
): GenericSuccessResPayload => {
  message = message || 'Successful';
  return {
    status: 'success',
    data,
    message,
  };
};
