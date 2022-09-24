require('babel-core/register');
import { Block, renderDOM, registerComponent } from './core';
import './styles/style.scss';

import Button from './components/Button/Button';
import Link from './components/Link/Link';
import Input from './components/Input/Input';
import ChatItem from './components/ChatItem/ChatItem';
import SearchBar from './components/SearchBar/SearchBar';
import User from './components/User/User';
import UserDataItem from './components/UserDataItem/UserDataItem';
import ProfileBackButton from './components/ProfileBackButton/ProfileBackButton';
import UserDataInput from './components/UserDataInput/UserDataInput';

import StartPage from './pages/start/start';
import SignupPage from './pages/signup/signup';
import { inputs } from './data/inputs';
import Main from './pages/main/main';
import { chats } from './data/chats';
import { userData } from './data/userData';
import Profile from './pages/profile/profile';
import changeUserData from './pages/changeUserData/changeUserData';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(ChatItem);
registerComponent(SearchBar);
registerComponent(User);
registerComponent(UserDataItem);
registerComponent(ProfileBackButton);
registerComponent(UserDataInput);

document.addEventListener('DOMContentLoaded', () => {
	// renderDOM(new StartPage());
	// renderDOM(new SignupPage({ inputs }));
	//renderDOM(new Main({ chats }));
	// renderDOM(new Profile({ userData }));
	renderDOM(new changeUserData({ userData }));
});
