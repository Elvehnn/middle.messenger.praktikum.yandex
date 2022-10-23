import AuthAPI from 'API/AuthAPI';
import { UserFromServer } from 'API/typesAPI';
import { isApiReturnedError } from 'utils/isApiReturnedError';
import { transformUserObject } from 'utils/transformUserObject';
import type { Dispatch } from '../store/Store';

type LoginPayload = {
  login: string;
  password: string;
};

const api = new AuthAPI();

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

  const user = await api.getUserInfo();

  if (isApiReturnedError(user)) {
    dispatch(signout);

    return;
  }

  dispatch({ user: transformUserObject(user as UserFromServer) });
  window.router.go('/main');
  dispatch({ isLoading: false, loginFormError: null });
};

export const signout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await api.signout();

  dispatch({ isLoading: false, user: null });

  window.router.go('/signin');
};
