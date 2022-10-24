import HTTPTransport from 'core/HttpTransport';
import { CreateChatRequestData, ResponseData } from './typesAPI';

export default class ChatsAPI extends HTTPTransport {
  constructor() {
    super();
  }
  //   changeProfile = async (data: ChangeProfileRequestData): Promise<ResponseData> =>
  //     this.put('user/profile', { data }) as Promise<ResponseData>;

  //   changeAvatar = () => this.get('auth/user');

  createChat = async (data: CreateChatRequestData): Promise<ResponseData> =>
    this.post('chats', { data }) as Promise<ResponseData>;

  getChats = async () => this.get('chats');
}
