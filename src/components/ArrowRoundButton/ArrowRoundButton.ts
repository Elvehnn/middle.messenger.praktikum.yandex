import Block from 'core/Block';
import './ArrowRoundButton.scss';

interface ArrowRoundButtonProps {
  path: string;
  class?: string;
}

export default class ArrowRoundButton extends Block {
  constructor({ path, class: string = 'arrow' }: ArrowRoundButtonProps) {
    super({ path, class: string });
  }

  render() {
    // language=hbs
    return `
        <a href='{{path}}' class='{{class}}'></a>
    `;
  }
}
