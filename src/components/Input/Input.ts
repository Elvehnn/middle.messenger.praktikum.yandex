import Block from 'core/Block';
import './Input.scss';

interface InputProps {
  type: 'text' | 'password' | 'email';
  inputName: string;
  placeholder?: string;
  value?: string;
  class?: string;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default class Input extends Block {
  constructor({ onInput, onFocus, onBlur, class: string = 'input', ...props }: InputProps) {
    super({
      class: string,
      ...props,
      events: {
        input: onInput,
        focus: onFocus,
        blur: onBlur,
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
      <input
        type='{{type}}'
        placeholder='{{placeholder}}'
        value='{{value}}' 
        name='{{inputName}}'
        class='{{class}}'
      />
     `;
  }
}
