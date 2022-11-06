import Block from 'core/Block';
import './Button.scss';

interface IncomingButtonProps {
  type: 'submit' | 'button' | 'reset';
  title: string;
  class: string;
  onClick?: () => void;
}

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  title: string;
  class: string;
  events: {
    click?: () => void;
  };
}

export default class Button extends Block<ButtonProps> {
  static componentName: string = 'Button';

  constructor({
    type,
    title = '',
    class: string = 'button button_confirm',
    onClick,
  }: IncomingButtonProps) {
    super({ title, class: string, type, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="{{class}}" type="{{type}}" onClick={{onClick}}>{{title}}</button>
    `;
  }
}
