import { Store } from 'store/Store';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import { UserFromServer } from 'API/typesAPI';
import Router from 'core/Router';
import { getUserInfo } from './authorization';

export async function startApp(router: Router, store: Store<AppState>) {
  try {
    store.setState({ isLoading: true });

    const user = (await getUserInfo()) as UserFromServer;

    user && store.setState({ user: transformUserObject(user) });
  } catch (error) {
    console.log((error as Error).message);
  } finally {
    store.setState({ isLoading: false, isAppStarted: true });
  }
}
