import HTTPTransport from 'core/HttpTransport';
import { APIError } from 'API/typesAPI';

type LoginRequestData = {
  login: string;
  password: string;
};

type LoginResponseData = {} | APIError;

export default class AuthAPI extends HTTPTransport {
  constructor() {
    super();
  }
  signin = (data: LoginRequestData): LoginResponseData => this.post('auth/signin', { data });

  getUserInfo = () => this.get('auth/user');

  signout = () => this.post('auth/logout');
}
