import { Dispatch } from 'store/Store';
import AuthAPI from 'API/AuthAPI';
import { isApiReturnedError } from 'utils/isApiReturnedError';
import { transformUserObject } from 'utils/transformUserObject';
import { UserFromServer } from 'API/typesAPI';

const api = new AuthAPI();

export async function startApp(dispatch: Dispatch<AppState>) {
  await new Promise((r) => setTimeout(r, 1000));

  try {
    const response = await api.getUserInfo();

    if (isApiReturnedError(response)) {
      console.log(response.status);
      window.router.go('/signin');
      return;
    }

    dispatch({ user: transformUserObject(response as UserFromServer) });
    window.router.go('/main');
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ isAppStarted: true });
  }
}
