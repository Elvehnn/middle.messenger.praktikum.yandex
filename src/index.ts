require('babel-core/register');

import { renderDOM, registerComponent } from './core';
import './styles/style.scss';
import Button from 'components/Button/Button';
import Link from 'components/Link/Link';
import Input from 'components/Input/Input';
import ChatItem from 'components/ChatItem/ChatItem';
import SearchBar from 'components/SearchBar/SearchBar';
import User from 'components/User/User';
import UserDataItem from 'components/UserDataItem/UserDataItem';
import UserDataInput from 'components/UserDataInput/UserDataInput';
import Popup from 'components/Popup/Popup';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import Label from 'components/Label/Label';
import ErrorMessage from 'components/Error/Error';
import ArrowRoundButton from 'components/ArrowRoundButton/ArrowRoundButton';
import ChatMessage from 'components/ChatMessage/ChatMessage';
import MessageInput from 'components/MessageInput/MessageInput';
import Avatar from 'components/Avatar/Avatar';
import CreateChatForm from 'components/Forms/CreateChatForm/CreateChatForm';
import ChangeAvatar from 'components/Forms/ChangeAvatar/ChangeAvatar';
import AddUserToChatForm from 'components/Forms/AddUserToChatForm/AddUserToChatForm';
import DeleteUserFromChatForm from 'components/Forms/DeleteUserFromChatForm/DeleteUserFromChatForm';
import ChatMenu from 'components/ChatMenu/ChatMenu';
import Router from 'core/Router';
import { initRouter } from 'services/initRouter';
import store, { Store } from './store/Store';
import { StartPage } from 'pages/start/start';
import { startApp } from 'services/startApp';
import SocketController from 'core/SocketController';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(ChatItem);
registerComponent(SearchBar);
registerComponent(User);
registerComponent(UserDataItem);
registerComponent(UserDataInput);
registerComponent(Popup);
registerComponent(ControlledInput);
registerComponent(Label);
registerComponent(ErrorMessage);
registerComponent(ArrowRoundButton);
registerComponent(ChatMessage);
registerComponent(MessageInput);
registerComponent(Avatar);
registerComponent(CreateChatForm);
registerComponent(AddUserToChatForm);
registerComponent(DeleteUserFromChatForm);
registerComponent(ChangeAvatar);
registerComponent(ChatMenu);

declare global {
  interface Window {
    router: Router;
    store: Store<AppState>;
    socketController: SocketController;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router();
  window.router = router;
  window.store = store;

  const socketController = new SocketController();
  window.socketController = socketController;

  // renderDOM(new StartPage({ router }));

  store.on('updated', (prevState, nextState) => {
    if (process.env.DEBUG) {
      console.log('%cstore updated', 'background: #222; color: #bada55', nextState);
    }
  });

  initRouter(router, store);
  store.dispatch(startApp);
});

// window.onunload = () => {
//   localStorage.removeItem('lastView');
// };
