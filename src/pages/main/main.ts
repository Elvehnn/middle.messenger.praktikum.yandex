import MessageInput from 'components/MessageInput/MessageInput';
import Input from 'components/Input/Input';
import Block from 'core/Block';
import './main.scss';
import { WithRouter } from 'utils/HOCS/WithRouter';
import Router from 'core/Router';
import { WithStore } from 'utils/HOCS/WithStore';
import { Store } from 'store/Store';
import { validateForm, ValidateType } from 'utils/checkers and validators/validateForm';
import { sendMessage } from 'services/chats';
import { reduceObjectToString } from 'utils/transformers/reduceObjectToString';

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

type MainPageProps = {
  router: Router;
  store: Store<AppState>;
  chats?: Nullable<Array<ChatType>>;
  events?: Record<string, unknown>;
  navigateToProfile?: () => void;
  toggleCreateChatForm?: () => void;
  toggleShowChatMenu?: () => void;
  toggleShowAddUserForm?: () => void;
  toggleShowDeleteUserForm?: () => void;
};

type Refs = {
  messageRef: MessageInput;
  attach: Input;
};
class MainPage extends Block<MainPageProps, Refs> {
  static componentName = 'MainPage';

  constructor(props: MainPageProps) {
    super({ ...props, events: { submit: (event: SubmitEvent) => this.onSubmit(event) } });

    this.setProps({
      chats: this.props.store.getState().chats,

      navigateToProfile: async () => {
        this.props.router.go('/profile');
      },
      toggleCreateChatForm: () => {
        document.querySelector('#createChat')?.classList.toggle('form-container_shown');
      },
      toggleShowChatMenu: () => {
        document.querySelector('.chat-menu')?.classList.toggle('chat-menu_shown');
      },
      toggleShowAddUserForm: () => {
        document.querySelector('#addUser')?.classList.toggle('form-container_shown');
        document.querySelector('.chat-menu')?.classList.remove('chat-menu_shown');
      },
      toggleShowDeleteUserForm: () => {
        document.querySelector('#deleteUser')?.classList.toggle('form-container_shown');
        document.querySelector('.chat-menu')?.classList.remove('chat-menu_shown');
      },
    });
  }

  componentDidUpdate() {
    if (this.props.store.getState().currentRoutePathname !== '/main') {
      return false;
    }

    this.children = {};

    return true;
  }

  onSubmit(event: SubmitEvent) {
    // TODO: добавить обработку прикрепленных файлов
    event.preventDefault();

    const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
      acc[key] = value.getContent() as HTMLInputElement;
      return acc;
    }, {} as { [key: string]: HTMLInputElement });

    const { messageRef } = refs;

    const errors = validateForm([{ name: ValidateType.Message, input: messageRef }]);

    if (Object.keys(errors).length === 0) {
      const chat = this.props.store.getState().selectedChat;

      if (chat) {
        sendMessage(messageRef.value, chat);
      }

      messageRef.value = '';
    }
  }

  render() {
    const { selectedChat } = this.props.store.getState();
    const { id, title, chatUsers = [] } = selectedChat || {};
    const chatUsersToString = reduceObjectToString(chatUsers, 'login');

    // language=hbs
    return `
        <main class="main" data-testid="main">
          {{{Preloader}}}
         
          {{{CreateChatForm onCancel=toggleCreateChatForm}}}
          {{{DeleteUserFromChatForm onCancel=toggleShowDeleteUserForm}}}
          {{{AddUserToChatForm onCancel=toggleShowAddUserForm}}}
            
          <section class='left'>
              <div class='top-list'>
                {{{Button class='button button_redirect top-list__goto-profile' title='Profile >' onClick=navigateToProfile}}} 
                {{{SearchBar}}}
              </div>
              
              <div class='chat-list'>
                {{#each chats}}
                  {{{ChatItem chat=this}}}
                {{/each}}
              </div>

              {{{Button class='button button_redirect top-list__goto-profile' title="Create chat +" onClick=toggleCreateChatForm}}}
          </section>

          <section class='chat'>
              {{#if ${id}}}
                <header class='chat__header'> 
                    <div class='chat-info'>
                      <div class='avatar'>
                        <img class='avatar_small' src='./images/avatar.jpg' alt='avatar' />
                      </div>
                        
                      <h4 class='chat-info__name'>${title}</h4>
                      <p>${chatUsersToString?.slice(0, chatUsersToString.length - 2)}</p>
                    </div>

                    <div class='chat__menu'>
                      {{{Button class="dots" onClick=toggleShowChatMenu}}}
                      {{{ChatMenu addUserHandler=toggleShowAddUserForm deleteUserHandler=toggleShowDeleteUserForm}}}
                    </div>
                </header>
                    
                <div class='chat__content'>
                    <div class='conversation'>
                    </div>
                </div>
                    
                <footer class='chat__footer'>
                    <form class='message-form'>
                      <div class="button-container">
                        {{{Label class='file-input' for='input-file'}}}
                        {{{Input ref='attach' id='input-file' name='attach' class="input_attach" type="file"}}}
                      </div>
                    
                      {{{MessageInput ref="messageRef" class='message'}}}

                      <div class="button-container">
                        {{{ArrowRoundButton arrowClass="arrow arrow_reverse" type="submit"}}}
                      </div>
                    </form>
                </footer>

                {{else}}
                  <h2>Select a chat to start messaging</h2>
              {{/if}}
          </section>
        </main>
        `;
  }
}

export default WithRouter(WithStore(MainPage));
