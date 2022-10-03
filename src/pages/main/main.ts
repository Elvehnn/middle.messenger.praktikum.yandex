import { ChatItemPreview } from 'components/ChatItem/ChatItem';
import Block from 'core/Block';
import { validateForm, ValidateType } from 'utils/validateForm';
import './main.scss';

type MainPageProps = {
  chats: ChatItemPreview[];
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

export default class MainPage extends Block {
  constructor({ chats }: MainPageProps) {
    super({ chats });

    this.setProps({
      onSubmit: (event: SubmitEvent) => {
        event.preventDefault();

        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key] = value.getContent() as HTMLInputElement;
          return acc;
        }, {} as { [key: string]: HTMLInputElement });

        const { attach, message } = refs;

        const errors = validateForm([{ type: ValidateType.Message, value: message.value }]);

        if (Object.keys(errors).length !== 0) {
          for (let key in errors) {
            console.log(errors[key]);
          }
        } else {
          console.log({
            message: message.value,
            attach: attach.value,
          });

          message.value = '';
        }
      },
    });
  }
  render() {
    // language=hbs
    return `
        <main class="main">
            <section class='left'>
            <div class='top-list'>
                {{{Link class='top-list__goto-profile' path='./profile.hbs' text='Profile >'}}} 
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
                    <div class='chat-info__avatar'>
                      <img class='avatar' src='../assets/avatar.jpg' alt='avatar' />
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
                      {{{Button ref="attach" class="button button_attach"}}}
                    </div>
                  
                    {{{MessageInput ref="message" class='message'}}}

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
