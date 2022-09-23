require('babel-core/register');
import { Block, renderDOM, registerComponent } from './core';
import './styles/style.scss';

import Button from './components/Button/Button';
import StartPage from './pages/start/start';
import Link from './components/Link/Link';
import Input from './components/Input/Input';
// import Layout from './components/layout';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
// registerComponent(Layout);

document.addEventListener('DOMContentLoaded', () => {
	renderDOM(new StartPage());
});
