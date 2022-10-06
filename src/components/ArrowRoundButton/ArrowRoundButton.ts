import Block from 'core/Block';
import './ArrowRoundButton.scss';

interface IncomingArrowRoundButtonProps {
  path: string;
  class?: string;
  onClick?: () => void;
}

interface ArrowRoundButtonProps {
  path: string;
  class?: string;
  events: {
    click?: () => void;
  };
}

export default class ArrowRoundButton extends Block<ArrowRoundButtonProps> {
  static componentName: string = 'ArrowRoundButton';

  constructor({ path, class: string = 'arrow', onClick }: IncomingArrowRoundButtonProps) {
    super({ path, class: string, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `
        <button class='{{class}}' onClick={{onClick}}></button>
    `;
  }
}
