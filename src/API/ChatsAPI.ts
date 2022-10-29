import HTTPTransport from 'core/HttpTransport';
import {
  UserToChatRequestData,
  CreateChatRequestData,
  DeleteChatRequestData,
  getChatUsersRequestData,
  ResponseData,
} from './typesAPI';

export default class ChatsAPI extends HTTPTransport {
  constructor() {
    super();
  }
  createChat = async (data: CreateChatRequestData): Promise<ResponseData> =>
    this.post('chats', { data }) as Promise<ResponseData>;

  deleteChat = async (data: DeleteChatRequestData): Promise<ResponseData> =>
    this.delete('chats', { data }) as Promise<ResponseData>;

  getChats = async () => this.get('chats');

  getChatToken = async (chatId: number): Promise<{ token: string }> =>
    this.post(`chats/token/${chatId}`) as Promise<{ token: string }>;

  addUserToChat = async (data: UserToChatRequestData): Promise<ResponseData> => {
    return this.put('chats/users', { data }) as Promise<ResponseData>;
  };

  deleteUserFromChat = async (data: UserToChatRequestData): Promise<ResponseData> => {
    return this.delete('chats/users', { data }) as Promise<ResponseData>;
  };

  getChatUsers = async (data: getChatUsersRequestData): Promise<ResponseData> => {
    return this.get(`chats/${data.chatId}/users`) as Promise<ResponseData>;
  };
}
