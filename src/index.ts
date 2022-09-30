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
import ProfileBackButton from 'components/ProfileBackButton/ProfileBackButton';
import UserDataInput from 'components/UserDataInput/UserDataInput';
import Popup from 'components/Popup/Popup';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import Label from 'components/Label/Label';
import ErrorMessage from 'components/Error/Error';

import StartPage from 'pages/start/start';
import SignupPage from 'pages/signup/signup';

import Main from 'pages/main/main';
import { chats } from './data/chats';
import { userData } from './data/userData';
import Profile from 'pages/profile/profile';
import changeUserData from 'pages/changeUserData/changeUserData';
import changeUserPassword from 'pages/changeUserPassword/changeUserPassword';
import changeUserAvatar from 'pages/changeUserAvatar/changeUserAvatar';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(ChatItem);
registerComponent(SearchBar);
registerComponent(User);
registerComponent(UserDataItem);
registerComponent(ProfileBackButton);
registerComponent(UserDataInput);
registerComponent(Popup);
registerComponent(ControlledInput);
registerComponent(Label);
registerComponent(ErrorMessage);

document.addEventListener('DOMContentLoaded', () => {
  // renderDOM(new StartPage());
  renderDOM(new SignupPage());
  // renderDOM(new Main({ chats }));
  // renderDOM(new Profile({ userData }));
  // renderDOM(new changeUserData({ userData }));
  // renderDOM(new changeUserPassword({ userData }));
  // renderDOM(new changeUserAvatar());
});
