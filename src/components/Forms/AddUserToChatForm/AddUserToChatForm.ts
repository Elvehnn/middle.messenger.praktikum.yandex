import Block from 'core/Block';
import './AddUserToChatForm.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { WithStore } from 'utils/HOCS/WithStore';
import { WithRouter } from 'utils/HOCS/WithRouter';
import Router from 'core/Router';
import { Store } from 'store/Store';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';

type AddUserToChatFormProps = {
  router: Router;
  store: Store<AppState>;
  onSubmit: (event: SubmitEvent) => void;
  onInput: (event: FocusEvent) => void;
  onFocus: (event: FocusEvent) => void;
  onCancel: () => void;
};

type AddUserToChatFormPropsRefs = {
  [key: string]: ControlledInput;
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

class AddUserToChatForm extends Block<AddUserToChatFormProps, AddUserToChatFormPropsRefs> {
  static componentName: string = 'AddUserToChatForm';

  constructor(props: AddUserToChatFormProps) {
    super(props);
    this.setProps({
      onSubmit: (event) => {
        event.preventDefault();

        const refs = getChildInputRefs(this.refs);
        const errors = getErrorsObject(refs);

        const { login } = refs;

        setChildErrorsProps(errors, this.refs);

        if (Object.keys(errors).length === 0) {
          console.log(login.value);
          // this.props.store.dispatch(createChat, { title: userLogin.value });
        }
      },
    });
  }
  render() {
    // language=hbs
    return `
      <div class='form-container' id='addUser'>
        <div class='overlay'></div>
        
        <form class='addUserToChatForm' action='#'>
                {{{Button class='addUserToChatForm__close' onClick=onCancel title='X'}}}

                <h3>Enter user login to add</h3>

                {{{ControlledInput
                    onInput=onInput 
                    onFocus=onFocus 
                    onBlur=onBlur
                    type="text"
                    inputName="login"
                    error=error
                    value=''
                    ref="login"
                    childInputRef="login"
                    placeholder="Enter login"
                }}}
                
                <div class="createChatForm__footer">
                    {{{ Button  title='Add user' class='button button_confirm' onClick=onSubmit}}}
                    {{{ Button  title='Cancel' class='button button_redirect' onClick=onCancel}}}
                    
                </div>
            </form>
      </div>
        `;
  }
}

export default WithStore(WithRouter(AddUserToChatForm));
