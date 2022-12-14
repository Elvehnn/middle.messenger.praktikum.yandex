import Block from 'core/Block';
import './Button.scss';

interface ButtonProps {
  type?: 'submit' | 'button' | 'reset';
  title?: string;
  class?: string;
  onClick?: () => void;
  dataTestid?: string;
  events?: {
    click?: () => void;
  };
}

export default class Button extends Block<ButtonProps> {
  static componentName = 'Button';

  constructor({
    type = 'button',
    title = '',
    class: string = 'button button_confirm',
    dataTestid = 'button',
    onClick,
  }: ButtonProps) {
    super({ title, class: string, type, dataTestid, events: { click: onClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <button data-testid="{{dataTestid}}" class="{{class}}" type="{{type}}" onclick={{onClick}}>{{title}}</button>
    `;
  }
}
