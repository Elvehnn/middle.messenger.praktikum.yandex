import { WebSocketMessage } from 'API/typesAPI';
import Block from 'core/Block';
import { deleteChat, getChatInfo, openSocket } from 'services/chats';
import { Store } from 'store/Store';
import { WithStore } from 'utils/HOCS/WithStore';
import './ChatItem.scss';

type ChatItemProps = {
  store: Store<AppState>;
  chat: ChatType;
  deleteChatHandler?: () => void;
  events?: Record<string, unknown>;
};

class ChatItem extends Block<ChatItemProps> {
  static componentName = 'ChatItem';

  unreadCount = 0;

  messagesArray: Array<WebSocketMessage> = [];

  constructor(props: ChatItemProps) {
    super({
      ...props,
      events: { click: (event: Event) => this.onChatItemClick(event) },
      deleteChatHandler: async () => {
        await deleteChat({ chatId: this.props.chat.id });
      },
    });
  }

  async onChatItemClick(event: Event) {
    if ((event.target as HTMLElement).tagName === 'BUTTON') {
      return;
    }

    await getChatInfo(this.props.chat);

    const { user, selectedChat } = this.props.store.getState();

    if (user && selectedChat) {
      openSocket(user.id, selectedChat);
    }
  }

  protected render(): string {
    // language=hbs
    return `
      <div class='chat-item' data-testid='chat-item' onclick={{onChatItemClick}}>
        <div class='chat-item__container'>
          <div class='chat-item__avatar' data-testid='chat-item-avatar'>
            <img class='avatar' src='./images/avatar.jpg' alt='avatar' />
          </div>

          <div class='chat-item__text'>
              <h4 class='chat-item__name' data-testid='chat-item-title'>{{chat.title}}</h4>
          </div>

          <div class='chat-item__info' data-testid='chat-item-info'>
              {{{Button class='chat-item__delete' title="X" onClick=deleteChatHandler dataTestid='chat-item-delete-btn' type='button'}}}
              
              <div class='chat-item__notifications'>
                <p class='chat-item__unread' data-testid='chat-item-unread'>{{chat.unreadCount}}</p>
              </div>
          </div>
        </div>
      </div>
    `;
  }
}

export default WithStore(ChatItem);
