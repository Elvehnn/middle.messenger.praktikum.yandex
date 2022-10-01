import Block from 'core/Block';
import './Button.scss';

interface ButtonProps {
  title: string;
  class: string;
  onClick?: () => void;
}

export default class Button extends Block {
  constructor({ title = '', class: string = 'button button_confirm', onClick }: ButtonProps) {
    super({ title, class: string, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="{{class}}" type="button" onClick={{onClick}}>{{title}}</button>
    `;
  }
}
