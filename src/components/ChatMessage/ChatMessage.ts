import Block from 'core/Block';
import './ChatMessage.scss';

interface ChatMessageProps {
  blockClass: string;
  content: string;
}

export default class ChatMessage extends Block<ChatMessageProps> {
  static componentName: string = 'ChatMessage';

  constructor({ blockClass = 'chat-message chat-message_mate', content }: ChatMessageProps) {
    super({ blockClass, content });
  }
  protected render(): string {
    // language=hbs
    return `
        <div class='{{blockClass}}'>
            <p>{{content}}</p>
            <time class='chat-message__time'>11:50</time>
        </div>
    `;
  }
}
