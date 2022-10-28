import AuthAPI from 'API/AuthAPI';
import { ChatFromServer, UserFromServer } from 'API/typesAPI';
import SigninPage from '../pages/signin/signin';
import { isApiReturnedError } from 'utils/isApiReturnedError';
import { transformUserObject } from 'utils/transformUserObject';
import type { Dispatch } from '../store/Store';
import { getAvatar } from './userData';
import { getChats } from './chats';
import UserAPI from 'API/UserAPI';
import ChatsAPI from 'API/ChatsAPI';
import { transformChatsObject } from 'utils/transformChatsObject';

type LoginPayload = {
  login: string;
  password: string;
};

type SignupPayload = {
  login: 'string';
  password: 'string';
  first_name: 'string';
  second_name: 'string';
  email: 'string';
  phone: 'string';
};

const api = new AuthAPI();
const chatsApi = new ChatsAPI();

export const signin = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload
) => {
  dispatch({ isLoading: true });

  const response = await api.signin(action);

  if (isApiReturnedError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const user = (await api.getUserInfo()) as UserFromServer;

  if (isApiReturnedError(user)) {
    dispatch(signout);

    return;
  }

  user.avatar = await getAvatar(user);
  const chats = (await chatsApi.getChats()) as ChatFromServer[];

  dispatch({
    user: transformUserObject(user),
    chats: chats.map((chat) => transformChatsObject(chat)),
  });

  window.router.go('/main');
};

export const signout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await api.signout();

  dispatch({
    isLoading: false,
    view: SigninPage,
    loginFormError: null,
    user: null,
    chats: null,
    selectedChat: null,
    isPopupShown: false,
    foundUsers: [],
  });

  window.router.go('/signin');
};

export const signup = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: SignupPayload
) => {
  dispatch({ isLoading: true });

  const response = await api.signup(action);

  if (isApiReturnedError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const user = (await api.getUserInfo()) as UserFromServer;

  if (isApiReturnedError(user)) {
    dispatch(signout);

    return;
  }

  user.avatar = await getAvatar(user);
  const chats = (await chatsApi.getChats()) as ChatFromServer[];

  dispatch({
    user: transformUserObject(user),
    chats: chats.map((chat) => transformChatsObject(chat)),
  });

  window.router.go('/main');
};
