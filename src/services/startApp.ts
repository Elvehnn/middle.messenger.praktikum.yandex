import { Store } from 'store/Store';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import { UserFromServer } from 'API/typesAPI';
import { getUserInfo } from './authorization';
import { getAvatar } from './userData';
import { getChats } from './chats';
import { isApiReturnedError } from 'utils/checkers and validators/isApiReturnedError';

export async function startApp(store: Store<AppState>) {
  try {
    store.setState({ isLoading: true });

    const user = (await getUserInfo()) as UserFromServer;

    if (isApiReturnedError(user)) {
      throw new Error(user.reason);
    }

    const avatar = await getAvatar(user);
    const modifiedUser = { ...user, avatar };
    const chats = await getChats(store);

    modifiedUser && chats && store.setState({ user: transformUserObject(modifiedUser), chats });
  } catch (error) {
    console.log((error as Error).message);
  } finally {
    store.setState({ isLoading: false, isAppStarted: true });
  }
}
