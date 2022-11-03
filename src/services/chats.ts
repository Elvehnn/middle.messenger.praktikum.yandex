import ChatsAPI from 'API/ChatsAPI';
import {
  ChatFromServer,
  CreateChatRequestData,
  DeleteChatRequestData,
  UnreadCountResponseData,
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

  try {
    const response = (await api.getChats()) as ChatFromServer[];

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    store.setState({
      chats: response.map((item) => transformChatsObject(item)),
    });

    return response.map((item) => transformChatsObject(item));
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const createChat = async (store: Store<AppState>, action: CreateChatRequestData) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.createChat(action);

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    await getChats(store);
    window.router.reload();
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const deleteChat = async (store: Store<AppState>, action: DeleteChatRequestData) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.deleteChat(action);

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    await getChats(store);
    window.router.reload();
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const addUserToChat = async (store: Store<AppState>, action: UserToChatData) => {
  store.setState({ isLoading: true });

  try {
    const user = await getUserByLogin(action.login);

    if (isApiReturnedError(user)) {
      throw new Error(user.reason);
    }

    if (!user || user?.length === 0) {
      throw new Error('User not found');
    }

    const response = await api.addUserToChat({ users: [user[0].id], chat: action.chat });

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    let chatUsers = action.chat.chatUsers;
    chatUsers = chatUsers && [...chatUsers, transformUserObject(user[0])];

    const selectedChat = {
      ...action.chat,
      chatUsers,
    };

    store.setState({ selectedChat: selectedChat });
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const deleteUserFromChat = async (store: Store<AppState>, action: UserToChatData) => {
  store.setState({ isLoading: true });

  try {
    const user = await getUserByLogin(action.login);

    if (isApiReturnedError(user)) {
      throw new Error(user.reason);
    }

    if (!user || user?.length === 0) {
      throw new Error('User not found');
    }

    const response = await api.deleteUserFromChat({ users: [user[0].id], chat: action.chat });

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    let chatUsers = action.chat.chatUsers;
    chatUsers =
      chatUsers && chatUsers.filter((item) => item.id !== transformUserObject(user[0]).id);

    const selectedChat = {
      ...action.chat,
      chatUsers,
    };

    store.setState({ selectedChat: selectedChat });
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const getChatInfo = async (store: Store<AppState>, action: ChatType) => {
  store.setState({ isLoading: true });

  try {
    const token = (await api.getChatToken(action.id)).token;

    if (isApiReturnedError(token)) {
      throw new Error(token.reason);
    }

    const users = await api.getChatUsers({ chatId: action.id });

    if (isApiReturnedError(users)) {
      throw new Error(users.reason);
    }

    const selectedChat = {
      ...action,
      chatUsers: users.map((user) => transformUserObject(user)),
      chatToken: token,
    };

    store.setState({ selectedChat: selectedChat });
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
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
  try {
    const unreadCount = await api.getUnreadMessagesCount({ chatId: action.id });

    if (isApiReturnedError(unreadCount)) {
      throw new Error(unreadCount.reason);
    }
    return unreadCount as UnreadCountResponseData;
  } catch (error) {
    window.store.setState({ loginFormError: (error as Error).message });
  }
};
