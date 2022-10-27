import Block from 'core/Block';
import './ChatMenu.scss';

interface ChatMenuProps {
  addUserHandler: () => void;
  deleteUserHandler: () => void;
}

export default class ChatMenu extends Block<ChatMenuProps> {
  static componentName: string = 'ChatMenu';

  constructor(props: ChatMenuProps) {
    super(props);
  }
  protected render(): string {
    // language=hbs
    return `
        <div class='chat-menu'>
            {{{Button class='button button_redirect' type='button' title='Add user' onClick=addUserHandler}}}
            {{{Button class='button button_redirect' type='button' title='Delete user' onClick=deleteUserHandler}}}
        </div>
    `;
  }
}
