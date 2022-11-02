import { ChatFromServer, UserFromServer } from 'API/typesAPI';
import SigninPage from 'pages/signin/signin';
import { isApiReturnedError } from 'utils/checkers and validators/isApiReturnedError';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import type { Store } from '../store/Store';
import { getAvatar } from './userData';
import ChatsAPI from 'API/ChatsAPI';
import { transformChatsObject } from 'utils/transformers/transformChatsObject';
import AuthAPI from 'API/AuthorizationAPI';
import { startApp } from './startApp';

export type LoginPayload = {
  login: string;
  password: string;
};

export type SignupPayload = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

const api = new AuthAPI();
const chatsApi = new ChatsAPI();

export const signin = async (store: Store<AppState>, action: LoginPayload) => {
  store.setState({ isLoading: true });

  const response = await api.signin(action);

  if (isApiReturnedError(response)) {
    store.setState({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const user = (await api.getUserInfo()) as UserFromServer;

  if (isApiReturnedError(user)) {
    await api.signout();

    return;
  }

  const avatar = await getAvatar(user);
  const modifiedUser = { ...user, avatar };

  const chats = (await chatsApi.getChats()) as ChatFromServer[];

  store.setState({
    user: transformUserObject(modifiedUser),
    chats: chats.map((chat) => transformChatsObject(chat)),
    isLoading: false,
    loginFormError: null,
  });

  window.router.go('/main');
};

export const signout = async (store: Store<AppState>) => {
  store.setState({ isLoading: true });

  const response = await api.signout();

  if (isApiReturnedError(response)) {
    await api.signout();

    return;
  }

  localStorage.removeItem('lastView');
  store.setState({
    isLoading: false,
    view: SigninPage,
    loginFormError: null,
    user: null,
    chats: null,
    selectedChat: null,
    isPopupShown: false,
    foundUsers: [],
  });

  startApp(window.router, store);
};

export const signup = async (store: Store<AppState>, action: Partial<UserFromServer>) => {
  store.setState({ isLoading: true });

  const response = await api.signup(action);

  if (isApiReturnedError(response)) {
    store.setState({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const user = { ...action, ...response, display_name: '', avatar: '' } as UserFromServer;
  const chats = (await chatsApi.getChats()) as ChatFromServer[];

  store.setState({
    user: transformUserObject(user),
    chats: chats.map((chat) => transformChatsObject(chat)),
    isLoading: false,
    loginFormError: null,
  });

  console.log(store.getState());

  window.router.go('/main');
};
