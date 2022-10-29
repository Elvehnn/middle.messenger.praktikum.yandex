import MessageInput from 'components/MessageInput/MessageInput';
import Input from 'components/Input/Input';
import Block from 'core/Block';
import './main.scss';
import { WithRouter } from 'utils/HOCS/WithRouter';
import Router from 'core/Router';
import { WithStore } from 'utils/HOCS/WithStore';
import { Store } from 'store/Store';
import { WithChats } from 'utils/HOCS/WithChats';
import { navigateTo } from 'utils/navigateTo';
import { validateForm, ValidateType } from 'utils/validateForm';
import { createMessageElement, MessageStatus, sendMessage } from 'services/chats';

type MainPageProps = {
  router: Router;
  store: Store<AppState>;
  chats: Nullable<Array<ChatType>>;
  onSubmit: (event: SubmitEvent) => void;
  navigateToProfile: () => void;
  toggleCreateChatForm: () => void;
  toggleShowChatMenu: () => void;
  toggleShowAddUserForm: () => void;
  toggleShowDeleteUserForm: () => void;
  addMessage: (message: string) => void;
};

type Refs = {
  messageRef: MessageInput;
  attach: Input;
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

class MainPage extends Block<MainPageProps, Refs> {
  static componentName: string = 'MainPage';

  constructor(props: MainPageProps) {
    super(props);

    this.setProps({
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key] = value.getContent() as HTMLInputElement;
          return acc;
        }, {} as { [key: string]: HTMLInputElement });

        const { attach, messageRef } = refs;

        const errors = validateForm([{ name: ValidateType.Message, input: messageRef }]);

        if (Object.keys(errors).length !== 0) {
          Object.values(errors).forEach((errorMessage) => console.log(errorMessage));
        } else {
          const chat = this.props.store.getState().selectedChat;

          if (chat) {
            sendMessage(messageRef.value, chat);
          }

          messageRef.value = '';
        }
      },
      navigateToProfile: async () => {
        navigateTo('profile');
      },
      toggleCreateChatForm: () => {
        document.querySelector('#createChat')?.classList.toggle('form-container_shown');
      },
      toggleShowChatMenu: () => {
        document.querySelector('.chat-menu')?.classList.toggle('chat-menu_shown');
      },
      toggleShowAddUserForm: () => {
        console.log('show', document.querySelector('#addUser'));
        document.querySelector('#addUser')?.classList.toggle('form-container_shown');
        document.querySelector('.chat-menu')?.classList.remove('chat-menu_shown');
      },
      toggleShowDeleteUserForm: () => {
        document.querySelector('#deleteUser')?.classList.toggle('form-container_shown');
        document.querySelector('.chat-menu')?.classList.remove('chat-menu_shown');
      },
    });
  }

  render() {
    const id = this.props.store.getState().selectedChat?.id;
    const title = this.props.store.getState().selectedChat?.title;
    const chatUsers = this.props.store.getState().selectedChat?.chatUsers?.reduce((acc, user) => {
      acc += `${user.login}, `;
      return acc;
    }, '');

    // language=hbs
    return `
        <main class="main">
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
                      <p>${chatUsers?.slice(0, chatUsers.length - 2)}</p>
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
                    <form class='message-form' action='#'>
                      <div class="button-container">
                        {{{Label class='file-input' for='input-file'}}}
                        {{{Input ref='attach' id='input-file' name='attach' class="input_attach" type="file"}}}
                      </div>
                    
                      {{{MessageInput ref="messageRef" class='message'}}}

                      <div class="button-container">
                        {{{ArrowRoundButton blockClass="arrow arrow_reverse" onClick=onSubmit}}}
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

export default WithRouter(WithStore(WithChats(MainPage)));

// {{{ChatMessage class="chat-message chat-message_mate"}}}
// {{{ChatMessage class="chat-message chat-message_owner"}}}
