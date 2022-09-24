require('babel-core/register');
import { Block, renderDOM, registerComponent } from './core';
import './styles/style.scss';

import Button from './components/Button/Button';
import Link from './components/Link/Link';
import Input from './components/Input/Input';

import StartPage from './pages/start/start';
import SignupPage from './pages/signup/signup';
import { inputs } from './data/inputs';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);

document.addEventListener('DOMContentLoaded', () => {
	// renderDOM(new StartPage());
	renderDOM(new SignupPage({ inputs }));
});
