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
import StartPage from 'pages/start/start';
import Router from 'core/Router';
import { initRouter } from 'services/initRouter';
import store, { Store } from './store/Store';

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

declare global {
  interface Window {
    router: Router;
    store: Store<AppState>;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router();
  window.router = router;
  window.store = store;

  // renderDOM(new StartPage());
  initRouter(router);
  router.start();
});
