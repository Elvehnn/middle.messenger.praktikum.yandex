import { Store } from 'store/Store';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import { UserFromServer } from 'API/typesAPI';
import { getUserInfo } from './authorization';
import { getAvatar } from './userData';
import { getChats } from './chats';
import { hidePreloader, showPreloader } from 'utils/showOrHidePreloader';

export async function startApp(store: Store<AppState>) {
  try {
    showPreloader();

    const user = (await getUserInfo()) as UserFromServer;

    if (user) {
      const avatar = await getAvatar(user);
      const modifiedUser = { ...user, avatar };
      const chats = await getChats();

      modifiedUser && chats && store.setState({ user: transformUserObject(modifiedUser), chats });
      return true;
    }

    throw new Error('You are not logged in');
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    hidePreloader();
    store.setState({ isAppStarted: true });
  }
}
