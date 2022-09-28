import Block from 'core/Block';
import './Input.scss';

interface InputProps {
  type: 'text' | 'password' | 'email';
  inputName: string;
  placeholder?: string;
  value?: string;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default class Input extends Block {
  constructor({ onInput, onFocus, onBlur, ...props }: InputProps) {
    super({
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
        inputName='{{inputName}}'
        class='input'
      />
     `;
  }
}
