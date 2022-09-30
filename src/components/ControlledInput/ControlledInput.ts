import Block from 'core/Block';
import { validateForm } from 'utils/validateForm';
import './ControlledInput.scss';

interface ControlledInputProps {
  type: 'text' | 'password' | 'email';
  inputName: string;
  placeholder?: string;
  value?: string;
  error?: string;
  childInputRef?: string;
  onInput?: () => void;
  onFocus?: () => void;
}

export default class ControlledInput extends Block {
  constructor({ error = '', ...props }: ControlledInputProps) {
    super({
      ...props,
      onBlur: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;
        const error = validateForm([
          { type: this.props.childInputRef.toLowerCase(), value: target.value },
        ])[this.props.childInputRef.toLowerCase()];
        // console.log(this.props.childInputRef.toLowerCase());

        this.refs.errorRef.setProps({ error: error });
      },
    });
    // console.log(props);
  }

  protected render(): string {
    // console.log(this.props);
    // language=hbs
    return `
        <div class='controlled-input'>
          {{{Input inputName=inputName type=type onInput=onInput onFocus=onFocus onBlur=onBlur ref=childInputRef placeholder=placeholder}}}
          {{{Label label=inputName}}}
          {{{ErrorMessage ref="errorRef"}}}
        </div>
    `;
  }
}
