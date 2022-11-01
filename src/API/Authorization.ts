import HTTPTransport from 'core/HttpTransport';
import {
  APIError,
  LoginRequestData,
  ResponseStatus,
  SignupRequestData,
  UserFromServer,
} from 'API/typesAPI';

export default class AuthAPI extends HTTPTransport {
  signin = async (data: LoginRequestData): Promise<ResponseStatus | APIError> =>
    this.post('auth/signin', { data }) as Promise<ResponseStatus | APIError>;

  getUserInfo = async (): Promise<UserFromServer | APIError> =>
    this.get('auth/user') as Promise<UserFromServer | APIError>;

  signout = (): Promise<ResponseStatus | APIError> =>
    this.post('auth/logout') as Promise<ResponseStatus | APIError>;

  signup = async (data: SignupRequestData): Promise<Record<string, number> | APIError> =>
    this.post('auth/signup', { data }) as Promise<Record<string, number> | APIError>;
}
