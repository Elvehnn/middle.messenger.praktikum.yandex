import { ChatItemPreview } from '../../constants/interfaces';
import Block from 'core/Block';
import './main.scss';

type MainPageProps = {
  chats: ChatItemPreview[];
};

export default class MainPage extends Block {
  constructor({ chats }: MainPageProps) {
    super({ chats });

    this.setProps({
      buttonOnClick: () => console.log('sign up!'),
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
                    <p>Menu</p>
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
                  <div class="button-container">
                    {{{Button class="button button_attach"}}}
                  </div>
                
                  <textarea class='message' name='message' placeholder='Write a message'></textarea>
                  <div class="button-container">
                    {{{ ArrowRoundButton path="./main.hbs" class="arrow arrow_reverse"}}}
                  </div>
                  
                </footer>
            </section>
        </main>
        `;
  }
}
