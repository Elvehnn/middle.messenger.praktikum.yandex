import { ChatItemPreview } from '../../constants/interfaces';
import Block from 'core/Block';
import './ChatItem.scss';

export default class ChatItem extends Block {
  constructor({ name, message, time, unread }: ChatItemPreview) {
    const onChatItemClick = () => console.log('chat click!');

    super({ name, message, time, unread, events: { click: onChatItemClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class='border'>
            <div class='chat-item' >
                <div class='chat-item__avatar'>
                    <img class='avatar' src='../assets/avatar.jpg' alt='avatar' />
                </div>

                <div class='chat-item__text'>
                    <h4 class='chat-item__name'>{{name}}</h4>
                    <p class='chat-item__message'>{{message}}</p>
                </div>

                <div class='chat-item__info'>
                    <button class='chat-item__delete'>X</button>
                    <div class='chat-item__notifications'>
                        <time class='chat-item__time'>{{time}}</time>
                        <p class='chat-item__unread'>{{unread}}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}
