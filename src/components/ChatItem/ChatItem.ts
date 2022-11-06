import { WebSocketMessage } from 'API/typesAPI';
import Block from 'core/Block';
import { deleteChat, getChatInfo, openSocket } from 'services/chats';
import { Store } from 'store/Store';
import { WithStore } from 'utils/HOCS/WithStore';
import './ChatItem.scss';

export interface ChatItemPreviewProps {
  store: Store<AppState>;
  chat: ChatType;
}

type ChatItemProps = ChatItemPreviewProps & {
  deleteChatHandler: () => void;
  events: {
    click: (event: Event) => void;
  };
};

class ChatItem extends Block<ChatItemProps> {
  static componentName: string = 'ChatItem';
  unreadCount: number = 0;
  messagesArray: Array<WebSocketMessage> = [];

  constructor(props: ChatItemPreviewProps) {
    const onChatItemClick = async (event: Event) => {
      if ((event.target as HTMLElement).tagName === 'BUTTON') {
        return;
      }

      await getChatInfo(this.props.store, this.props.chat);

      const { user, selectedChat } = this.props.store.getState();

      if (user && selectedChat) {
        openSocket(user.id, selectedChat);
      }
    };

    super({
      ...props,
      events: { click: onChatItemClick },
      deleteChatHandler: () => {
        deleteChat(this.props.store, { chatId: this.props.chat.id });
      },
    });
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
                    <h4 class='chat-item__name'>{{chat.title}}</h4>
                </div>

                <div class='chat-item__info'>
                    {{{Button class='chat-item__delete' title="X" onClick=deleteChatHandler}}}
                    <div class='chat-item__notifications'>
                        <p class='chat-item__unread'>{{chat.unreadCount}}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}

export default WithStore(ChatItem);
