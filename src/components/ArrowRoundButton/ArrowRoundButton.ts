import Block from 'core/Block';
import './ArrowRoundButton.scss';

interface ArrowRoundButtonProps {
  path: string;
  class?: string;
  onClick?: () => void;
}

export default class ArrowRoundButton extends Block {
  constructor({ path, class: string = 'arrow', onClick }: ArrowRoundButtonProps) {
    super({ path, class: string, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `
        <button class='{{class}}' onClick={{onClick}}></button>
    `;
  }
}
