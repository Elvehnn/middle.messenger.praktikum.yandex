import Block from '../../core/Block';
import './Button.scss';

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

export default class Button extends Block {
  constructor({ title, onClick }: ButtonProps) {
    super({ title, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="button button_confirm" type="button" onClick={{onClick}}>{{title}}</button>
    `;
  }
}
