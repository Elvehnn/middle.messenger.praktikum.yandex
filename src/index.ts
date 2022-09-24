require('babel-core/register');
import { Block, renderDOM, registerComponent } from './core';
import './styles/style.scss';

import Button from './components/Button/Button';
import Link from './components/Link/Link';
import Input from './components/Input/Input';
import ChatItem from './components/ChatItem/ChatItem';

import StartPage from './pages/start/start';
import SignupPage from './pages/signup/signup';
import { inputs } from './data/inputs';
import Main from './pages/main/main';
import { chats } from './data/chats';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(ChatItem);

document.addEventListener('DOMContentLoaded', () => {
	// renderDOM(new StartPage());
	// renderDOM(new SignupPage({ inputs }));
	renderDOM(new Main({ chats }));
});
