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
  events: {
    input?: () => void;
    focus?: () => void;
    blur?: () => void;
  };
};

export default class Input extends Block<InputProps> {
  static componentName: string = 'Input';

  constructor({
    onInput,
    onFocus,
    onBlur,
    class: string = 'input',
    type,
    value,
    inputName,
    id,
    placeholder,
  }: InputIncomingProps) {
    super({
      class: string,
      type,
      value,
      inputName,
      id,
      placeholder,
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
      data-testid='{{inputName}}'
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
