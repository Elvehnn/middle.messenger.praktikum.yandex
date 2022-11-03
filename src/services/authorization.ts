import { ChatFromServer, UserFromServer } from 'API/typesAPI';
import { isApiReturnedError } from 'utils/checkers and validators/isApiReturnedError';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import type { Store } from '../store/Store';
import { getAvatar } from './userData';
import ChatsAPI from 'API/ChatsAPI';
import { transformChatsObject } from 'utils/transformers/transformChatsObject';
import AuthAPI from 'API/AuthorizationAPI';

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

  try {
    const response = await api.signin(action);

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    const user = (await api.getUserInfo()) as UserFromServer;

    if (isApiReturnedError(user)) {
      throw new Error(user.reason);
    }

    const avatar = await getAvatar(user);
    const modifiedUser = { ...user, avatar };

    const chats = (await chatsApi.getChats()) as ChatFromServer[];

    if (isApiReturnedError(chats)) {
      throw new Error(chats.reason);
    }

    store.setState({
      user: transformUserObject(modifiedUser),
      chats: chats.map((chat) => transformChatsObject(chat)),
    });

    window.router.go('/main');
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
    window.router.go('/signin');
  } finally {
    store.setState({ isLoading: false });
  }
};

export const signout = async (store: Store<AppState>) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.signout();

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({
      isLoading: false,
      loginFormError: '',
      user: null,
      chats: [],
      selectedChat: null,
      isPopupShown: false,
    });

    window.router.go('/signin');
  }
};

export const signup = async (store: Store<AppState>, action: Partial<UserFromServer>) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.signup(action);

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    const user = { ...action, ...response, display_name: '', avatar: '' } as UserFromServer;
    const chats = (await chatsApi.getChats()) as ChatFromServer[];

    if (isApiReturnedError(chats)) {
      throw new Error(chats.reason);
    }

    store.setState({
      user: transformUserObject(user),
      chats: chats.map((chat) => transformChatsObject(chat)),
    });

    window.router.go('/main');
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const getUserInfo = async () => {
  try {
    const user = await api.getUserInfo();

    if (isApiReturnedError(user)) {
      if (user.reason === 'Cookie is not valid') {
        throw new Error('You are not logged in');
      }
      throw new Error(user.reason);
    }

    return user;
  } catch (error) {
    window.store.setState({ loginFormError: (error as Error).message });
  }
};
