import Block from 'core/Block';
import './CreateChatForm.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { WithStore } from 'utils/HOCS/WithStore';
import { WithRouter } from 'utils/HOCS/WithRouter';
import Router from 'core/Router';
import { Store } from 'store/Store';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';
import { createChat } from 'services/chats';

type CreateChatFormProps = {
  router: Router;
  store: Store<AppState>;
  events: {};
  onCancel: () => void;
};

type CreateChatFormRefs = Indexed<ControlledInput>;

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

class CreateChatForm extends Block<CreateChatFormProps, CreateChatFormRefs> {
  static componentName: string = 'CreateChatForm';

  constructor(props: CreateChatFormProps) {
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => this.onSubmit(event),
      },
    });

    this.setProps({
      onCancel: () => {
        document.querySelector('#createChat')?.classList.remove('form-container_shown');
      },
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const refs = getChildInputRefs(this.refs);
    const errors = getErrorsObject(refs);

    const { chatName } = refs;

    setChildErrorsProps(errors, this.refs);

    if (Object.keys(errors).length === 0) {
      createChat({ title: chatName.value });
      document.querySelector('#createChat')?.classList.remove('form-container_shown');
    }
  }

  render() {
    const { errorMessage } = this.props.store.getState();
    // language=hbs
    return `
      <div class='form-container' id='createChat'>
          <div class='overlay'></div>

          <form class='createChatForm' onSubmit={{onSubmit}}>
          {{{Button class='createChatForm__close' onClick=onCancel title='X' type='button'}}}

          <h3>Enter the name for the new chat</h3>

          {{{ControlledInput
              onInput=onInput 
              onFocus=onFocus 
              onBlur=onBlur
              type="text"
              inputName="chatName"
              error=error
              value=''
              ref="chatName"
              childInputRef="chatName"
              placeholder="Enter any name"
          }}}
          
          <div class="createChatForm__footer">
              <p class='form-submit__warning'>${errorMessage}</p>

              {{{Button  title='Create chat' class='button button_confirm' type='submit'}}}
              {{{Button  title='Cancel' class='button button_redirect' onClick=onCancel type='button'}}}
          </div>
      </form>
      </div>
     `;
  }
}

export default WithStore(WithRouter(CreateChatForm));
