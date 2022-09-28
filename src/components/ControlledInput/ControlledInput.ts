import Block from 'core/Block';
import './ControlledInput.scss';

interface ControlledInputProps {
  type: 'text' | 'password' | 'email';
  inputName: string;
  placeholder?: string;
  value?: string;
  error?: string;
  onInput?: () => void;
  onFocus?: () => void;
}

export default class ControlledInput extends Block {
  constructor({ error = '', ...props }: ControlledInputProps) {
    super({
      ...props,
      onBlur: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;
        console.log(target.value);

        this.refs.errorRef.setProps({ label: target.value });
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class='controlled-input'>
          {{{Input inputName=inputName type=type onInput=onInput onFocus=onFocus onBlur=onBlur}}}
          {{{Label label=inputName}}}
          {{{ErrorMessage ref="errorRef"}}}
        </div>
    `;
  }
}
