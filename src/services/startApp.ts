import { Dispatch } from 'store/Store';
import AuthAPI from 'API/AuthAPI';
import { isApiReturnedError } from 'utils/isApiReturnedError';
import { transformUserObject } from 'utils/transformUserObject';
import { ChatFromServer, UserFromServer } from 'API/typesAPI';
import ChatsAPI from 'API/ChatsAPI';
import { transformChatsObject } from 'utils/transformChatsObject';
import { getAvatar } from './userData';

const authApi = new AuthAPI();
const chatsApi = new ChatsAPI();

export async function startApp(dispatch: Dispatch<AppState>) {
  await new Promise((r) => setTimeout(r, 1000));

  try {
    const user = (await authApi.getUserInfo()) as UserFromServer;

    if (isApiReturnedError(user)) {
      window.router.go('/signin');

      return;
    }

    user.avatar = await getAvatar(user);
    const chats = (await chatsApi.getChats()) as ChatFromServer[];

    dispatch({
      user: transformUserObject(user),
      chats: chats.map((chat) => transformChatsObject(chat)),
    });

    window.router.go('/main');
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ isAppStarted: true });
  }
}
