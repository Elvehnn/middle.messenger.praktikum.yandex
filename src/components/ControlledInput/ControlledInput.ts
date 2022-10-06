import ErrorMessage from 'components/Error/Error';
import Input from 'components/Input/Input';
import Block from 'core/Block';
import { validateForm, ValidateType } from 'utils/validateForm';
import './ControlledInput.scss';

export type ControlledInputRefs = {
  [key: string]: Input | ErrorMessage;
};
interface IncomingControlledInputProps {
  type: 'text' | 'password' | 'email';
  inputName: string;
  placeholder?: string;
  value?: string;
  error?: string;
  childInputRef: string;
  label?: string;
  for?: string;
  class?: string;
  onInput?: () => void;
  onFocus?: () => void;
}

type ControlledInputProps = IncomingControlledInputProps & {
  onBlur: (event: FocusEvent) => void;
};

export default class ControlledInput extends Block<ControlledInputProps, ControlledInputRefs> {
  static componentName: string = 'ControlledInput';

  constructor({ error = '', inputName, label = inputName, ...props }: ControlledInputProps) {
    super({
      ...props,
      error,
      inputName,
      label,
      onBlur: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;
        const error = validateForm([
          { type: this.props.childInputRef.toLowerCase() as ValidateType, value: target.value },
        ])[this.props.childInputRef.toLowerCase()];

        this.refs.errorRef.setProps({ error: error });
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class='controlled-input'>
          {{{Input inputName=inputName type=type onInput=onInput onFocus=onFocus class=class
            onBlur=onBlur ref=childInputRef placeholder=placeholder id=childInputRef}}}
          {{{Label label=label for=id}}}
          {{{ErrorMessage ref="errorRef"}}}
        </div>
    `;
  }
}
