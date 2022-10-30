import { ChangePasswordRequestData, ChangeProfileRequestData, UserFromServer } from 'API/typesAPI';
import UserAPI from 'API/UserAPI';
import { DEFAULT_AVATAR } from 'constants/imagesPaths';
import { isApiReturnedError } from 'utils/checkers and validators/isApiReturnedError';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import type { Dispatch } from '../store/Store';

const api = new UserAPI();

export const changeUserProfile = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: ChangeProfileRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.changeProfile(action);

  if (isApiReturnedError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch({
    user: transformUserObject(response as UserFromServer),
    isLoading: false,
    loginFormError: null,
  });

  window.router.back();
};

export const changeUserPassword = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: ChangePasswordRequestData
) => {
  dispatch({ isLoading: true });

  const response = await api.changePassword(action);

  if (isApiReturnedError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });

    return;
  }

  dispatch({
    isLoading: false,
    loginFormError: null,
  });

  window.router.back();
};

export const getUserByLogin = async (login: string) => {
  const users = (await api.getUserByLogin({ login })) as UserFromServer[];

  console.log(users);
  return users;
};

export const changeAvatar = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: FormData
) => {
  const newUser = (await api.changeAvatar(action)) as UserFromServer;
  newUser.avatar = await getAvatar(newUser);

  dispatch({ user: transformUserObject(newUser) });
};

export const getAvatar = async (user: UserFromServer | UserType) => {
  if (!user.avatar) {
    return DEFAULT_AVATAR;
  }

  const blob = (await api.getAvatar(user.avatar)) as Blob;

  return URL.createObjectURL(blob);
};
