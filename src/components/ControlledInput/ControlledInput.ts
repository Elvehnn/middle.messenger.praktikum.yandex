import ErrorMessage from 'components/Error/Error';
import Input from 'components/Input/Input';
import Block from 'core/Block';
import { stringToPascalCase } from 'utils/transformers/stringToPascalCase';
import { validateForm, ValidateType } from 'utils/checkers and validators/validateForm';
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
}

type ControlledInputProps = IncomingControlledInputProps & {
  onInputEvent: (event: FocusEvent) => void;
};

export default class ControlledInput extends Block<ControlledInputProps, ControlledInputRefs> {
  static componentName: string = 'ControlledInput';

  constructor({ error = '', inputName, label = inputName, ...props }: ControlledInputProps) {
    super({
      ...props,
      error,
      inputName,
      label,
      onInputEvent: (event: FocusEvent) => {
        window.store.setState({ loginFormError: '' });

        const target = event.target as HTMLInputElement;
        const nameInPascalCase = stringToPascalCase(inputName);
        const error = validateForm([{ name: nameInPascalCase as ValidateType, input: target }])[
          nameInPascalCase
        ];

        this.refs.errorRef.setProps({ error: error });
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class='controlled-input'>
          {{{Input inputName=inputName type=type onInput=onInputEvent onFocus=onInputEvent class=class
            onBlur=onInputEvent ref=childInputRef placeholder=placeholder id=childInputRef}}}
          {{{Label label=label for=id}}}
          {{{ErrorMessage ref="errorRef"}}}
        </div>
    `;
  }
}
