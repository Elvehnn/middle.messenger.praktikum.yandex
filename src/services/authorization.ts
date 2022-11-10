import { ChatFromServer, UserFromServer } from 'API/typesAPI';
import { isApiReturnedError } from 'utils/checkers and validators/isApiReturnedError';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import type { Store } from '../store/Store';
import { getAvatar } from './userData';
import ChatsAPI from 'API/ChatsAPI';
import { transformChatsObject } from 'utils/transformers/transformChatsObject';
import AuthAPI from 'API/AuthorizationAPI';
import { hidePreloader, showPreloader } from 'utils/showOrHidePreloader';
import { DEFAULT_AVATAR } from '../constants/imagesPaths';

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
  showPreloader();

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
      errorMessage: '',
    });

    window.router.go('/main');
  } catch (error) {
    store.setState({ errorMessage: (error as Error).message });
    window.router.go('/signin');
  } finally {
    hidePreloader();
  }
};

export const signup = async (store: Store<AppState>, action: Partial<UserFromServer>) => {
  showPreloader();

  try {
    const response = await api.signup(action);

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    const user = {
      ...action,
      ...response,
      display_name: '',
      avatar: DEFAULT_AVATAR,
    } as UserFromServer;
    const chats = (await chatsApi.getChats()) as ChatFromServer[];

    if (isApiReturnedError(chats)) {
      throw new Error(chats.reason);
    }

    store.setState({
      user: transformUserObject(user),
      chats: chats.map((chat) => transformChatsObject(chat)),
      errorMessage: '',
    });

    window.router.go('/main');
  } catch (error) {
    store.setState({ errorMessage: (error as Error).message });
  } finally {
    hidePreloader();
  }
};

export const signout = async (store: Store<AppState>) => {
  showPreloader();

  try {
    const response = await api.signout();

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }
  } catch (error) {
    store.setState({ errorMessage: (error as Error).message });
  } finally {
    hidePreloader();

    store.setState({
      user: null,
      chats: [],
    });

    window.router.go('/signin');
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
    window.store.setState({ errorMessage: (error as Error).message });
  }
};
