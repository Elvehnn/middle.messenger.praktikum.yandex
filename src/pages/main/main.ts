import { ChatItemPreview } from '../../constants/interfaces';
import Block from '../../core/Block';
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

            <section class='right'>
                <h2>Select chat</h2>
            </section>
        </main>
        `;
	}
}
