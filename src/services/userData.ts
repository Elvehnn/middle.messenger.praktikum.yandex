import { ChangePasswordRequestData, UserFromServer } from 'API/typesAPI';
import UserAPI from 'API/UserAPI';
import { isApiReturnedError } from 'utils/checkers and validators/isApiReturnedError';
import { hidePreloader, showPreloader } from 'utils/showOrHidePreloader';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import { DEFAULT_AVATAR } from '../constants/imagesPaths';
import type { Store } from '../store/Store';

const api = new UserAPI();

export const changeUserProfile = async (action: Partial<UserFromServer>) => {
  showPreloader();

  try {
    const response = await api.changeProfile(action);

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    const avatar = window.store.getState()?.user?.avatar || DEFAULT_AVATAR;

    const updatedUser = { ...transformUserObject(response as UserFromServer), avatar };

    window.store.setState({
      user: updatedUser,
    });

    window.router.go('/profile');
  } catch (error) {
    window.store.setState({ errorMessage: (error as Error).message });
  } finally {
    hidePreloader();
  }
};

export const changeUserPassword = async (action: ChangePasswordRequestData) => {
  showPreloader();

  try {
    const response = await api.changePassword(action);

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    window.router.back();
  } catch (error) {
    window.store.setState({ errorMessage: (error as Error).message });
  } finally {
    hidePreloader();
  }
};

export const getUserByLogin = async (login: string) => {
  try {
    const users = await api.getUserByLogin({ login });

    if (isApiReturnedError(users)) {
      throw new Error(users.reason);
    }

    return users as UserFromServer[];
  } catch (error) {
    window.store.setState({ errorMessage: (error as Error).message });

    return [];
  }
};

export const getAvatar = async (user: UserFromServer | UserType) => {
  if (!user.avatar) {
    return DEFAULT_AVATAR;
  }

  const blob = (await api.getAvatar(user.avatar)) as Blob;

  return URL.createObjectURL(blob);
};

export const changeAvatar = async (store: Store<AppState>, action: FormData) => {
  showPreloader();

  try {
    let newUser = (await api.changeAvatar(action)) as UserFromServer;

    if (isApiReturnedError(newUser)) {
      throw new Error(newUser.reason);
    }

    const avatar = await getAvatar(newUser);

    if (isApiReturnedError(avatar)) {
      throw new Error(avatar.reason);
    }

    newUser = { ...newUser, avatar };

    store.setState({ user: transformUserObject(newUser) });

    return avatar;
  } catch (error) {
    window.store.setState({ errorMessage: (error as Error).message });

    return store.getState().user?.avatar;
  } finally {
    hidePreloader();
  }
};
