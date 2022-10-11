import Block from 'core/Block';
import './Button.scss';

interface IncomingButtonProps {
  title: string;
  class: string;
  onClick?: () => void;
}

interface ButtonProps {
  title: string;
  class: string;
  events: {
    click?: () => void;
  };
}

export default class Button extends Block<ButtonProps> {
  static componentName: string = 'Button';

  constructor({
    title = '',
    class: string = 'button button_confirm',
    onClick,
  }: IncomingButtonProps) {
    super({ title, class: string, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <button class="{{class}}" type="button" onClick={{onClick}}>{{title}}</button>
    `;
  }
}
