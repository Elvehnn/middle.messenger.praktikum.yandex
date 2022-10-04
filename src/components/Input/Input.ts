import Block from 'core/Block';
import './Input.scss';

type InputIncomingProps = {
  type: 'text' | 'password' | 'email' | 'file';
  inputName: string;
  placeholder?: string;
  value?: string;
  class?: string;
  id?: string;
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

type InputProps = InputIncomingProps & {
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export default class Input extends Block<InputProps> {
  constructor({ onInput, onFocus, onBlur, class: string = 'input', ...props }: InputIncomingProps) {
    super({
      class: string,
      ...props,
      onInput,
      onFocus,
      onBlur,
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
        id='{{id}}'
      />
     `;
  }
}
