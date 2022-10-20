import HTTPTransport from 'core/HttpTransport';
import { APIError } from './typesAPI';

type LoginRequestData = {
  login: string;
  password: string;
};

type LoginResponseData = {} | APIError;

export class authAPI extends HTTPTransport {
  signin = (data: LoginRequestData): LoginResponseData => this.post('auth/signin', { data });

  getUserInfo = () => this.get('auth/user');

  signout = () => this.post('auth/logout');
}
