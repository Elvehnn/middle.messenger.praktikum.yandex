import ChatsAPI from 'API/ChatsAPI';
import {
  UserToChatRequestData,
  ChatFromServer,
  CreateChatRequestData,
  DeleteChatRequestData,
  UserFromServer,
} from 'API/typesAPI';
import { Dispatch } from 'store/Store';
import { isApiReturnedError } from 'utils/isApiReturnedError';
import { transformChatsObject } from 'utils/transformChatsObject';
import { transformUserObject } from 'utils/transformUserObject';

const api = new ChatsAPI();

export const getChats = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  const response = (await api.getChats()) as ChatFromServer[];

  if (isApiReturnedError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch({
    chats: response.map((item) => transformChatsObject(item)),
    isLoading: false,
    loginFormError: null,
  });
  return response.map((item) => transformChatsObject(item));
};

export const createChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: CreateChatRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.createChat(action);

  if (isApiReturnedError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch(getChats);
  dispatch({ isLoading: false, loginFormError: null });
};

export const deleteChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: DeleteChatRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.deleteChat(action);

  if (isApiReturnedError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch(getChats);
  dispatch({ isLoading: false, loginFormError: null });
};

export const addUserToChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UserToChatRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.addUserToChat(action);

  if (isApiReturnedError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const users = (await api.getChatUsers({ chatId: action.chat.id })) as UserFromServer[];

  if (isApiReturnedError(users)) {
    dispatch({ isLoading: false, loginFormError: users.reason });

    return;
  }

  const selectedChat = {
    ...action.chat,
    chatUsers: users.map((user) => transformUserObject(user)),
  };

  dispatch({ selectedChat: selectedChat, isLoading: false, loginFormError: null });
};

export const deleteUserFromChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UserToChatRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.deleteUserFromChat(action);

  if (isApiReturnedError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const users = (await api.getChatUsers({ chatId: action.chat.id })) as UserFromServer[];

  if (isApiReturnedError(users)) {
    dispatch({ isLoading: false, loginFormError: users.reason });

    return;
  }

  const selectedChat = {
    ...action.chat,
    chatUsers: users.map((user) => transformUserObject(user)),
  };

  dispatch({ selectedChat: selectedChat, isLoading: false, loginFormError: null });
};

export const getChatInfo = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: ChatType
) => {
  dispatch({ isLoading: true });

  const token = (await api.getChatToken(action.id)).token;

  if (isApiReturnedError(token)) {
    dispatch({ isLoading: false, loginFormError: token.reason });

    return;
  }

  const users = (await api.getChatUsers({ chatId: action.id })) as UserFromServer[];

  if (isApiReturnedError(users)) {
    dispatch({ isLoading: false, loginFormError: users.reason });

    return;
  }

  const selectedChat = {
    ...action,
    chatUsers: users.map((user) => transformUserObject(user)),
    chatToken: token as string,
  };

  if (state.user) {
    openSocket(state.user.id, selectedChat);
  }

  dispatch({ selectedChat: selectedChat, isLoading: false, loginFormError: null });
};

export const openSocket = (id: number, chat: ChatType) => {
  const socket = window.socketController.socketsMap.get(String(id));

  if (!socket) {
    window.socketController.createSocket(id, chat);

    return;
  }
};

export const sendMessage = (message: string, chat: ChatType) => {
  const socket = window.socketController.socketsMap.get(String(chat.id));
  const messageObject = {
    content: message,
    type: 'message',
  };

  socket?.send(JSON.stringify(messageObject));
};

export enum MessageStatus {
  Owner = 'owner',
  Mate = 'mate',
}
export const createMessageElement = (
  message: { time: string; content: string },
  status: MessageStatus
): HTMLDivElement => {
  const elementClass =
    status === MessageStatus.Owner
      ? ['chat-message', 'chat-message_mate']
      : ['chat-message', 'chat-message_owner'];

  const messageElement = document.createElement('div');
  messageElement.classList.add(...elementClass);

  const textElement = document.createElement('p');
  textElement.textContent = message.content;

  const timeElement = document.createElement('time');
  timeElement.classList.add('chat-message__time');
  timeElement.textContent = message.time;

  messageElement.append(textElement, timeElement);

  return messageElement;
};
