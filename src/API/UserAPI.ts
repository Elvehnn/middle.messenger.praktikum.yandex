import HTTPTransport from 'core/HttpTransport';
import { APIError, UserFromServer } from 'API/typesAPI';

type ChangeProfileRequestData = {
  first_name: 'string';
  second_name: 'string';
  display_name: 'string';
  login: 'string';
  email: 'string';
  phone: 'string';
};

type ChangeProfileResponseData = {} | APIError;

export default class UserAPI extends HTTPTransport {
  constructor() {
    super();
  }
  changeProfile = async (data: ChangeProfileRequestData): Promise<ChangeProfileResponseData> =>
    this.put('user/profile', { data }) as Promise<ChangeProfileResponseData>;

  changeAvatar = () => this.get('auth/user');

  changePassword = () => this.post('auth/logout');

  getUserById = () => {};
}
