import { ChangePasswordRequestData, UserFromServer } from 'API/typesAPI';
import UserAPI from 'API/UserAPI';
import { DEFAULT_AVATAR } from 'constants/imagesPaths';
import { isApiReturnedError } from 'utils/checkers and validators/isApiReturnedError';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import type { Store } from '../store/Store';

const api = new UserAPI();

export const changeUserProfile = async (
  store: Store<AppState>,
  action: Partial<UserFromServer>
) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.changeProfile(action);

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    const avatar = store.getState()?.user?.avatar || DEFAULT_AVATAR;

    const updatedUser = { ...transformUserObject(response as UserFromServer), avatar };

    store.setState({
      user: updatedUser,
      loginFormError: null,
    });

    window.router.back();
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const changeUserPassword = async (
  store: Store<AppState>,
  action: ChangePasswordRequestData
) => {
  store.setState({ isLoading: true });

  try {
    const response = await api.changePassword(action);

    if (isApiReturnedError(response)) {
      throw new Error(response.reason);
    }

    store.setState({
      loginFormError: null,
    });

    window.router.back();
  } catch (error) {
    store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
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
    window.store.setState({ loginFormError: (error as Error).message });
  }
};

export const changeAvatar = async (store: Store<AppState>, action: FormData) => {
  store.setState({ isLoading: true });

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
  } catch (error) {
    window.store.setState({ loginFormError: (error as Error).message });
  } finally {
    store.setState({ isLoading: false });
  }
};

export const getAvatar = async (user: UserFromServer | UserType) => {
  if (!user.avatar) {
    return DEFAULT_AVATAR;
  }

  const blob = (await api.getAvatar(user.avatar)) as Blob;

  return URL.createObjectURL(blob);
};
