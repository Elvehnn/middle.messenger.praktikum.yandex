import HTTPTransport from 'core/HttpTransport';
import {
  AddUserToChatRequestData,
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

  addUserToChat = async (data: AddUserToChatRequestData): Promise<ResponseData> => {
    return this.put('chats/users', { data }) as Promise<ResponseData>;
  };

  getChatUsers = async (data: getChatUsersRequestData): Promise<ResponseData> => {
    console.log(data);
    return this.get(`chats/${data.chatId}/users`) as Promise<ResponseData>;
  };
}
