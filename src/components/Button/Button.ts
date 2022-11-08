import Block from 'core/Block';
import './Button.scss';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  title?: string;
  class?: string;
  onClick?: () => void;
  dataTestid?: string;
  events?: {
    click?: () => void;
  };
}

export default class Button extends Block<ButtonProps> {
  static componentName: string = 'Button';

  constructor({
    type,
    title = '',
    class: string = 'button button_confirm',
    dataTestid = 'button',
    onClick,
  }: ButtonProps) {
    super({ title, class: string, type, dataTestid, events: { click: onClick } });
  }

  protected render(): string {
    // console.log(`%c Button block render with id = ${this.id}`, 'background: #9f9af3; color: #fff');
    // language=hbs
    return `
        <button data-testid="{{dataTestid}}" class="{{class}}" type="{{type}}" onClick={{onClick}}>{{title}}</button>
    `;
  }
}
