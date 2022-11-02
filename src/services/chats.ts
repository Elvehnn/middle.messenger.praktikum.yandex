import ChatsAPI from 'API/ChatsAPI';
import {
  ChatFromServer,
  CreateChatRequestData,
  DeleteChatRequestData,
  UnreadCountResponseData,
  UserFromServer,
  UserToChatData,
} from 'API/typesAPI';
import { Store } from 'store/Store';
import { isApiReturnedError } from 'utils/checkers and validators/isApiReturnedError';
import { transformChatsObject } from 'utils/transformers/transformChatsObject';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import { getUserByLogin } from './userData';

const api = new ChatsAPI();

export const getChats = async (store: Store<AppState>) => {
  store.setState({ isLoading: true });

  const response = (await api.getChats()) as ChatFromServer[];

  if (isApiReturnedError(response)) {
    store.setState({ isLoading: false, loginFormError: response.reason });

    return;
  }

  store.setState({
    chats: response.map((item) => transformChatsObject(item)),
    isLoading: false,
    loginFormError: null,
  });

  return response.map((item) => transformChatsObject(item));
};

export const createChat = async (store: Store<AppState>, action: CreateChatRequestData) => {
  store.setState({ isLoading: true });

  const response = await api.createChat(action);

  if (isApiReturnedError(response)) {
    store.setState({ isLoading: false, loginFormError: response.reason });

    return;
  }

  getChats(store);
};

export const deleteChat = async (store: Store<AppState>, action: DeleteChatRequestData) => {
  store.setState({ isLoading: true });

  const response = await api.deleteChat(action);

  if (isApiReturnedError(response)) {
    store.setState({ isLoading: false, loginFormError: response.reason });

    return;
  }

  getChats(store);
  store.setState({ isLoading: false, loginFormError: null });
};

export const addUserToChat = async (store: Store<AppState>, action: UserToChatData) => {
  store.setState({ isLoading: true });

  const user = await getUserByLogin(action.login);

  if (!user || user.length === 0) {
    store.setState({ isLoading: false, loginFormError: 'User not found' });

    return;
  }

  const response = await api.addUserToChat({ users: [user[0].id], chat: action.chat });

  if (isApiReturnedError(response)) {
    store.setState({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const users = (await api.getChatUsers({ chatId: action.chat.id })) as UserFromServer[];

  if (isApiReturnedError(users)) {
    store.setState({ isLoading: false, loginFormError: users.reason });

    return;
  }

  const selectedChat = {
    ...action.chat,
    chatUsers: users.map((user) => transformUserObject(user)),
  };

  store.setState({ selectedChat: selectedChat, isLoading: false, loginFormError: null });
};

export const deleteUserFromChat = async (store: Store<AppState>, action: UserToChatData) => {
  store.setState({ isLoading: true });

  const user = await getUserByLogin(action.login);

  if (!user || user.length === 0) {
    store.setState({ isLoading: false, loginFormError: 'User not found' });

    return;
  }

  const response = await api.deleteUserFromChat({ users: [user[0].id], chat: action.chat });

  if (isApiReturnedError(response)) {
    store.setState({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const users = (await api.getChatUsers({ chatId: action.chat.id })) as UserFromServer[];

  if (isApiReturnedError(users)) {
    store.setState({ isLoading: false, loginFormError: users.reason });

    return;
  }

  const selectedChat = {
    ...action.chat,
    chatUsers: users.map((user) => transformUserObject(user)),
  };

  store.setState({ selectedChat: selectedChat, isLoading: false, loginFormError: null });
};

export const getChatInfo = async (store: Store<AppState>, action: ChatType) => {
  store.setState({ isLoading: true });

  const token = (await api.getChatToken(action.id)).token;

  if (isApiReturnedError(token)) {
    store.setState({ isLoading: false, loginFormError: token.reason });

    return;
  }

  const users = (await api.getChatUsers({ chatId: action.id })) as UserFromServer[];

  if (isApiReturnedError(users)) {
    store.setState({ isLoading: false, loginFormError: users.reason });

    return;
  }

  const selectedChat = {
    ...action,
    chatUsers: users.map((user) => transformUserObject(user)),
    chatToken: token as string,
  };

  const { user } = store.getState();

  if (user) {
    openSocket(user.id, selectedChat);
  }

  store.setState({ selectedChat: selectedChat, isLoading: false, loginFormError: null });
};

export const openSocket = (id: number, chat: ChatType) => {
  const socket = window.socketController.socketsMap.get(String(id));

  if (!socket) {
    window.socketController.createSocket(id, chat);

    return;
  }
};

export const sendMessage = (message: string, chat: ChatType) => {
  const socket = window.socketController.socketsMap.get(String(chat.id))?.socket;
  const messageObject = {
    content: message,
    type: 'message',
  };

  socket?.send(JSON.stringify(messageObject));
};

export const getUnreadMessagesCount = async (action: ChatType) => {
  return (await api.getUnreadMessagesCount({ chatId: action.id })) as UnreadCountResponseData;
};
