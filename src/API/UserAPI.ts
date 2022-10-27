import HTTPTransport from 'core/HttpTransport';
import {
  ChangePasswordRequestData,
  ChangeProfileRequestData,
  GetUserByLoginRequestData,
  ResponseData,
} from 'API/typesAPI';

export default class UserAPI extends HTTPTransport {
  constructor() {
    super();
  }
  changeProfile = async (data: ChangeProfileRequestData): Promise<ResponseData> =>
    this.put('user/profile', { data }) as Promise<ResponseData>;

  changeAvatar = async (data: FormData): Promise<ResponseData> =>
    this.put('user/profile/avatar', {
      data,
      contentType: 'multipart/form-data',
    }) as Promise<ResponseData>;

  changePassword = async (data: ChangePasswordRequestData): Promise<ResponseData> =>
    this.put('user/password', { data }) as Promise<ResponseData>;

  getUserById = () => {};

  getUserByLogin = async (data: Record<string, string>): Promise<ResponseData> =>
    this.post('user/search', { data }) as Promise<ResponseData>;
}
