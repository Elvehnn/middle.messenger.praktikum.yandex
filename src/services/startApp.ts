import { Dispatch } from 'store/Store';
import { isApiReturnedError } from 'utils/checkers and validators/isApiReturnedError';
import { transformUserObject } from 'utils/transformers/transformUserObject';
import { ChatFromServer, UserFromServer } from 'API/typesAPI';
import ChatsAPI from 'API/ChatsAPI';
import { transformChatsObject } from 'utils/transformers/transformChatsObject';
import { getAvatar } from './userData';
import AuthAPI from 'API/AuthorizationAPI';

const authApi = new AuthAPI();
const chatsApi = new ChatsAPI();

export async function startApp(dispatch: Dispatch<AppState>) {
  const lastView = localStorage.getItem('lastView');

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
