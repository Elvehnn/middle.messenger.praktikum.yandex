import { APIError } from 'API/typesAPI';

export const isApiReturnedError = (response: any | APIError): response is APIError => {
  return response && response.reason ? true : false;
};
