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
import { addUserToChat } from 'services/chats';

type AddUserToChatFormProps = {
  router: Router;
  store: Store<AppState>;
  events: Record<string, unknown>;
  onCancel: () => void;
};

type AddUserToChatFormRefs = Indexed<ControlledInput>;

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

class AddUserToChatForm extends Block<AddUserToChatFormProps, AddUserToChatFormRefs> {
  static componentName = 'AddUserToChatForm';

  constructor(props: AddUserToChatFormProps) {
    super({ ...props, events: { submit: (event: SubmitEvent) => this.onSubmit(event) } });
  }

  async onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const refs = getChildInputRefs(this.refs);
    const errors = getErrorsObject(refs);
    const { login } = refs;

    setChildErrorsProps(errors, this.refs);

    if (Object.keys(errors).length === 0) {
      const chat = this.props.store.getState().selectedChat;

      if (chat) {
        await addUserToChat({ login: login.value, chat });
      }
    }
  }

  render() {
    const { errorMessage } = this.props.store.getState();
    // language=hbs
    return `
      <div class='form-container' id='addUser'>
        <div class='overlay'></div>
        
        <form class='add-user-to-chat-form' onSubmit={{onSubmit}}>
                {{{Button class='add-user-to-chat-form__close' type='button' onClick=onCancel title='X'}}}

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
                
                <div class="add-user-to-chat-form__footer">
                    <p class='form-submit__warning'>${errorMessage}</p>

                    {{{Button  title='Add user' class='button button_confirm' type='submit'}}}
                    {{{Button  title='Cancel' class='button button_redirect' onClick=onCancel type='button'}}}
                    
                </div>
            </form>
      </div>
        `;
  }
}

export default WithStore(WithRouter(AddUserToChatForm));
