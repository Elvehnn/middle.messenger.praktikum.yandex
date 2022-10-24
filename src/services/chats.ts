import ChatsAPI from 'API/ChatsAPI';
import { ChatFromServer, CreateChatRequestData } from 'API/typesAPI';
import { Dispatch } from 'store/Store';
import { isApiReturnedError } from 'utils/isApiReturnedError';
import { transformChatsObject } from 'utils/transformChatsObject';

const api = new ChatsAPI();

export const getChats = async (dispatch: Dispatch<AppState>, state: AppState) => {
  dispatch({ isLoading: true });

  const response = (await api.getChats()) as ChatFromServer[];

  if (isApiReturnedError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch({ chats: response.map((item) => transformChatsObject(item)) });
  window.router.go('/main');
  dispatch({ isLoading: false, loginFormError: null });
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
