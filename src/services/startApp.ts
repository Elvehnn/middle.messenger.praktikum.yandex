import { Store } from 'store/Store';
import { isApiReturnedError } from 'utils/checkers and validators/isApiReturnedError';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import { UserFromServer } from 'API/typesAPI';
import { getAvatar } from './userData';
import AuthAPI from 'API/AuthorizationAPI';
import MainPage from 'pages/main/main';
import SigninPage from 'pages/signin/signin';
import { ROUTS } from 'constants/routes';
import { getChats } from './chats';
import Router from 'core/Router';

const authApi = new AuthAPI();

export async function startApp(router: Router, store: Store<AppState>) {
  const lastView = localStorage.getItem('lastView');
  console.log('lastView', lastView);
  console.log('store', store);

  if (!lastView) {
    store.setState({ isAppStarted: true });
    router.go('/signin');
    return;
  }

  const user = (await authApi.getUserInfo()) as UserFromServer;
  console.log(user);

  if (isApiReturnedError(user)) {
    store.setState({ view: SigninPage });
    router.go('/signin');
  }

  const isPrivate = ROUTS.find((route) => route.pathname === lastView)?.isPrivate;

  console.log('isPrivate', isPrivate);

  if (isPrivate) {
    try {
      let avatar = await getAvatar(user);

      if (isApiReturnedError(avatar)) {
        router.go('/signin');
      }

      const fullUser = { ...user, avatar };
      const chats = await getChats(window.store);

      console.log(fullUser);

      store.setState({
        user: transformUserObject(fullUser),
        chats,
      });
    } catch (err) {
      console.error(err);
    } finally {
      store.setState({ isAppStarted: true });
      router.go(lastView);
    }
  }

  if (!isPrivate && user) {
    try {
      let avatar = await getAvatar(user);

      if (isApiReturnedError(avatar)) {
        router.go('/signin');
      }

      const fullUser = { ...user, avatar };
      const chats = await getChats(store);

      store.setState({
        user: transformUserObject(fullUser),
        chats,
        view: MainPage,
      });
    } catch (err) {
      console.error(err);
    } finally {
      store.setState({ isAppStarted: true });
      router.go('/main');
    }
  }
}
