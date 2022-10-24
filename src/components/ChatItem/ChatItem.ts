import Block from 'core/Block';
import './ChatItem.scss';

export interface ChatItemPreview {
  name: string;
  lastMessage?: string;
  time?: string;
  unread: string;
}

type ChatItemProps = ChatItemPreview & {
  events: {
    click: () => void;
  };
};

export default class ChatItem extends Block<ChatItemProps> {
  static componentName: string = 'ChatItem';

  constructor({ ...rest }: ChatItemPreview) {
    const onChatItemClick = () => console.log('chat click!');

    super({ ...rest, events: { click: onChatItemClick } });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class='border'>
            <div class='chat-item' >
                <div class='chat-item__avatar'>
                    <img class='avatar' src='./images/avatar.jpg' alt='avatar' />
                </div>

                <div class='chat-item__text'>
                    <h4 class='chat-item__name'>{{name}}</h4>
                </div>

                <div class='chat-item__info'>
                    <button class='chat-item__delete'>X</button>
                    <div class='chat-item__notifications'>
                        <p class='chat-item__unread'>{{unread}}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}

// <time class='chat-item__time'>{{time}}</time>
