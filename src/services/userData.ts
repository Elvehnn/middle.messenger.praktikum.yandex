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

  const response = await api.changeProfile(action);

  if (isApiReturnedError(response)) {
    store.setState({ isLoading: false, loginFormError: response.reason });

    return;
  }

  const avatar = store.getState()?.user?.avatar || DEFAULT_AVATAR;

  const updatedUser = { ...transformUserObject(response as UserFromServer), avatar };

  store.setState({
    user: updatedUser,
    isLoading: false,
    loginFormError: null,
  });

  window.router.back();
};

export const changeUserPassword = async (
  store: Store<AppState>,
  action: ChangePasswordRequestData
) => {
  store.setState({ isLoading: true });

  const response = await api.changePassword(action);

  if (isApiReturnedError(response)) {
    store.setState({ isLoading: false, loginFormError: response.reason });

    return;
  }

  store.setState({
    isLoading: false,
    loginFormError: null,
  });

  window.router.back();
};

export const getUserByLogin = async (login: string) => {
  const users = await api.getUserByLogin({ login });

  if (isApiReturnedError(users)) {
    window.store.setState({ isLoading: false, loginFormError: users.reason });

    return;
  }

  return users as UserFromServer[];
};

export const changeAvatar = async (store: Store<AppState>, action: FormData) => {
  store.setState({ isLoading: true });

  const newUser = (await api.changeAvatar(action)) as UserFromServer;
  newUser.avatar = await getAvatar(newUser);

  store.setState({ user: transformUserObject(newUser), isLoading: false });
};

export const getAvatar = async (user: UserFromServer | UserType) => {
  if (!user.avatar) {
    return DEFAULT_AVATAR;
  }

  const blob = (await api.getAvatar(user.avatar)) as Blob;

  return URL.createObjectURL(blob);
};
