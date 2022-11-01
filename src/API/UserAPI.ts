import HTTPTransport from 'core/HttpTransport';
import {
  APIError,
  ChangePasswordRequestData,
  ChangeProfileRequestData,
  ResponseStatus,
  UserFromServer,
} from 'API/typesAPI';

export default class UserAPI extends HTTPTransport {
  constructor() {
    super();
  }
  changeProfile = async (data: ChangeProfileRequestData): Promise<UserFromServer | APIError> =>
    this.put('user/profile', { data }) as Promise<UserFromServer | APIError>;

  changeAvatar = async (data: FormData): Promise<UserFromServer | APIError> =>
    this.put('user/profile/avatar', {
      data,
      contentType: '',
    }) as Promise<UserFromServer | APIError>;

  getAvatar = async (path: string) =>
    this.get(`resources/${path.slice(1)}`, {}, { responseType: 'blob' });

  changePassword = async (data: ChangePasswordRequestData): Promise<ResponseStatus | APIError> =>
    this.put('user/password', { data }) as Promise<ResponseStatus | APIError>;

  getUserByLogin = async (data: Record<string, string>): Promise<UserFromServer | APIError> =>
    this.post('user/search', { data }) as Promise<UserFromServer | APIError>;
}
