import {
  ChangePasswordRequestData,
  ChangeProfileRequestData,
  GetUserByLoginRequestData,
  UserFromServer,
} from 'API/typesAPI';
import UserAPI from 'API/UserAPI';
import { isApiReturnedError } from 'utils/isApiReturnedError';
import { transformUserObject } from 'utils/transformUserObject';
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
  const newUser = await api.changeAvatar(action);

  console.log(newUser);
};
