import { APIError } from 'API/typesAPI';

// TODO: Реализовать спецификацию ошибок
export const isApiReturnedError = (response: unknown | APIError): response is APIError => {
  if (response) {
    Object.prototype.hasOwnProperty.call(response, 'reason');
  }

  return false;
};
