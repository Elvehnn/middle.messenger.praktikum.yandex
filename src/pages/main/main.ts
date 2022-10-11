import { ChatItemPreview } from 'components/ChatItem/ChatItem';
import MessageInput from 'components/MessageInput/MessageInput';
import Input from 'components/Input/Input';
import Block from 'core/Block';
import { validateForm, ValidateType } from 'utils/validateForm';
import './main.scss';

type IncomingProps = {
  chats: ChatItemPreview[];
};

type Props = IncomingProps & {
  onSubmit: (event: SubmitEvent) => void;
};

type Refs = {
  messageRef: MessageInput;
  attach: Input;
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

export default class MainPage extends Block<Props, Refs> {
  static componentName: string = 'MainPage';

  constructor({ chats }: IncomingProps) {
    super({
      chats,
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key] = value.getContent() as HTMLInputElement;
          return acc;
        }, {} as { [key: string]: HTMLInputElement });

        const { attach, messageRef } = refs;

        const errors = validateForm([{ type: ValidateType.Message, value: messageRef.value }]);

        if (Object.keys(errors).length !== 0) {
          Object.values(errors).forEach((errorMessage) => console.log(errorMessage));
        } else {
          console.log({
            message: messageRef.value,
            attach: attach.value,
          });

          messageRef.value = '';
        }
      },
    });

    this.setProps({});
  }
  render() {
    // language=hbs
    return `
        <main class="main">
            <section class='left'>
            <div class='top-list'>
                {{{Link class='top-list__goto-profile' path='./profile' text='Profile >'}}} 
                {{{SearchBar}}}
            </div>
            
            <div class='chat-list'>
            {{#each chats}}
            {{#with this}}
                {{{ChatItem name="{{name}}" message="{{message}}" time="{{time}}" unread="{{unread}}"}}}
            {{/with}}
        {{/each}}
            </div>
            </section>

            <section class='chat'>
                <header class='chat__header'> 
                  <div class='chat-info'>
                    <div class='avatar'>
                      <img class='avatar_small' src='./images/avatar.jpg' alt='avatar' />
                    </div>
                      
                    <h4 class='chat-info__name'>Vadim</h4>
                  </div>

                  <div class='header-menu'>
                    <div class="dots"></div>
                  </div>
                </header>
                  
                <div class='chat__content'>
                  <div class='conversation'>
                    <div class='conversation__day'>
                      <h4>Date</h4>
                      {{{ChatMessage class="chat-message chat-message_mate"}}}
                      {{{ChatMessage class="chat-message chat-message_owner"}}}
                    </div>
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
                      {{{ ArrowRoundButton class="arrow arrow_reverse" onClick=onSubmit}}}
                    </div>
                  </form>
                </footer>
            </section>
        </main>
        `;
  }
}
