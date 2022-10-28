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

  dispatch({ isLoading: false, loginFormError: null });
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

  dispatch({ isLoading: false, loginFormError: null });
};

export const getChatUsers = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: ChatType
) => {
  dispatch({ isLoading: true });

  const response = (await api.getChatUsers({ chatId: action.id })) as UserFromServer[];

  if (isApiReturnedError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const selectedChat = { ...action, chatUsers: response.map((user) => transformUserObject(user)) };

  dispatch({ selectedChat: selectedChat, isLoading: false, loginFormError: null });
};
