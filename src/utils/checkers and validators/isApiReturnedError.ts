import { APIError } from 'API/typesAPI';

//TODO: Реализовать спецификацию ошибок
export const isApiReturnedError = (response: any | APIError): response is APIError => {
  return response && response.reason ? true : false;
};
