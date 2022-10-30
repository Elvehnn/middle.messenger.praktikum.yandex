import Block from 'core/Block';
import { DataItemProps } from 'components/UserDataItem/UserDataItem';
import Input from 'components/Input/Input';
import './UserDataInput.scss';
import ErrorMessage from 'components/Error/Error';
import { validateForm, ValidateType } from 'utils/checkers and validators/validateForm';

type IncomingUserDataInputProps = DataItemProps & {
  childRef: string;
  inputName: string;
  error?: string;
};

type UserDataInputProps = IncomingUserDataInputProps & {
  onInputEvent?: (event: FocusEvent) => void;
};

type UserDataInputRefs = Record<string, Input | ErrorMessage>;

export default class UserDataInput extends Block<UserDataInputProps, UserDataInputRefs> {
  static componentName: string = 'UserDataInput';

  constructor({ title, data, type, childRef, error = '', inputName }: IncomingUserDataInputProps) {
    super({
      title,
      data,
      type,
      childRef,
      error,
      inputName,
      onInputEvent: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;
        const error = validateForm([{ name: inputName as ValidateType, input: target }])[inputName];

        this.refs.errorRef.setProps({ error: error });
      },
    });
  }
  render() {
    // language=hbs
    return `
            <div class='change-data'>
              <div class='change-data__container'>
                <div class='change-data__title'>{{title}}</div>
                {{{Input
                    ref=childRef
                    type=type
                    placeholder=' '
                    inputName=inputName
                    value=data
                    class='change-data__input'
                    onInput=onInputEvent
                    onFocus=onInputEvent
                    onBlur=onInputEvent
                }}}
              </div>
                
              {{{ErrorMessage ref="errorRef"}}}
            </div>
        `;
  }
}
