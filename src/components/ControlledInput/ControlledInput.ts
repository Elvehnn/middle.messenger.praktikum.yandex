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
        const error = validateForm([{ type: this.props.childInputRef, value: target.value }])[
          this.props.childInputRef
        ];
        // console.log(this.props.childInputRef);

        this.refs.errorRef.setProps({ error: error });
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class='controlled-input'>
          {{{Input inputName=inputName type=type onInput=onInput onFocus=onFocus onBlur=onBlur ref=childInputRef}}}
          {{{Label label=inputName}}}
          {{{ErrorMessage ref="errorRef"}}}
        </div>
    `;
  }
}
