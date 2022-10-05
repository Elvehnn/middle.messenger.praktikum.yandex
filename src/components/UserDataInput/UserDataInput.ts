import Block from 'core/Block';
import { DataItemProps } from 'components/UserDataItem/UserDataItem';
import Input from 'components/Input/Input';
import './UserDataInput.scss';
import ErrorMessage from 'components/Error/Error';
import { validateForm, ValidateType } from 'utils/validateForm';

type IncomingUserDataInputProps = DataItemProps & {
  childRef: string;
  inputName: string;
  error?: string;
};

type UserDataInputProps = IncomingUserDataInputProps & {
  onInput?: (event: FocusEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
};

type UserDataInputRefs = {
  [key: string]: Input | ErrorMessage;
};

export default class UserDataInput extends Block<UserDataInputProps, UserDataInputRefs> {
  constructor({ title, data, type, childRef, error = '', inputName }: IncomingUserDataInputProps) {
    super({
      title,
      data,
      type,
      childRef,
      error,
      inputName,
      onInput: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;

        const error = validateForm([
          { type: inputName.toLowerCase() as ValidateType, value: target.value },
        ])[inputName.toLowerCase()];

        this.refs.errorRef.setProps({ error: error });
      },
      onFocus: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;

        const error = validateForm([
          { type: inputName.toLowerCase() as ValidateType, value: target.value },
        ])[inputName.toLowerCase()];

        this.refs.errorRef.setProps({ error: error });
      },
      onBlur: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;

        const error = validateForm([
          { type: inputName.toLowerCase() as ValidateType, value: target.value },
        ])[inputName.toLowerCase()];

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
                    onInput=onInput
                    onFocus=onFocus
                    onBlur=onBlur
                }}}
              </div>
                
              {{{ErrorMessage ref="errorRef"}}}
            </div>
        `;
  }
}
