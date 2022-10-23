import HTTPTransport from 'core/HttpTransport';
import {
  ChangePasswordRequestData,
  ChangeProfileRequestData,
  ChangeProfileResponseData,
} from 'API/typesAPI';

export default class UserAPI extends HTTPTransport {
  constructor() {
    super();
  }
  changeProfile = async (data: ChangeProfileRequestData): Promise<ChangeProfileResponseData> =>
    this.put('user/profile', { data }) as Promise<ChangeProfileResponseData>;

  changeAvatar = () => this.get('auth/user');

  changePassword = async (data: ChangePasswordRequestData): Promise<ChangeProfileResponseData> =>
    this.put('user/password', { data }) as Promise<ChangeProfileResponseData>;

  getUserById = () => {};
}
