import Block from './Block';
import { AnyProps } from './RegisterComponent';

export default function renderDOM(block: Block<{}>) {
  const root = document.querySelector('#app');

  root!.innerHTML = '';
  root!.appendChild(block.getContent());
  block.dispatchComponentDidMount();
}
