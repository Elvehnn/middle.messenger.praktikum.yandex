import Block from 'core/Block';
import './DeleteUserFromChatForm.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { WithStore } from 'utils/HOCS/WithStore';
import { WithRouter } from 'utils/HOCS/WithRouter';
import Router from 'core/Router';
import { Store } from 'store/Store';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';
import { deleteUserFromChat } from 'services/chats';

type DeleteUserFromChatFormProps = {
  router: Router;
  store: Store<AppState>;
  events: Record<string, unknown>;
  onCancel: () => void;
};

type DeleteUserFromChatFormRefs = {
  [key: string]: ControlledInput;
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

class DeleteUserFromChatForm extends Block<
  DeleteUserFromChatFormProps,
  DeleteUserFromChatFormRefs
> {
  static componentName = 'DeleteUserFromChatForm';

  constructor(props: DeleteUserFromChatFormProps) {
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
        await deleteUserFromChat({ login: login.value, chat });
      }
    }
  }

  render() {
    const { errorMessage } = this.props.store.getState();
    // language=hbs
    return `
      <div class='form-container' id='deleteUser'>
        <div class='overlay'></div>
        
        <form class='addUserToChatForm' onSubmit={{onSubmit}}>
                {{{Button class='addUserToChatForm__close' onClick=onCancel title='X' type='button'}}}

                <h3>Enter user login to delete</h3>

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
                    <p class='form-submit__warning'>${errorMessage}</p>

                    {{{Button title='Delete user' class='button button_confirm' type='submit'}}}
                    {{{Button title='Cancel' class='button button_redirect' onClick=onCancel type='button'}}}
                    
                </div>
            </form>
      </div>
        `;
  }
}

export default WithStore(WithRouter(DeleteUserFromChatForm));
