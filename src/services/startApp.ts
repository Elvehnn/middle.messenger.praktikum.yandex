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
  const lastView = localStorage.getItem('lastView');
  console.log('last view: ', lastView);

  // if (!lastView) {
  //   await new Promise((r) => setTimeout(r, 1000));
  // }

  try {
    const user = (await authApi.getUserInfo()) as UserFromServer;

    if (isApiReturnedError(user) && lastView !== '/signup') {
      window.router.go('/signin');

      return;
    }

    if (isApiReturnedError(user) && lastView === '/signup') {
      window.router.go('/signup');

      return;
    }

    user.avatar = await getAvatar(user);
    const chats = (await chatsApi.getChats()) as ChatFromServer[];

    dispatch({
      user: transformUserObject(user),
      chats: chats.map((chat) => transformChatsObject(chat)),
    });

    if (lastView) {
      window.router.go(lastView);
      return;
    }

    window.router.go('/main');
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ isAppStarted: true });
  }
}
