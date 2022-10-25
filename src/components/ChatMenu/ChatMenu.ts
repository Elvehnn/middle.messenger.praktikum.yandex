import Block from 'core/Block';
import './ChatMenu.scss';

interface ChatMenuProps {
  addUserHandler: () => void;
  deleteUserOnClick: () => void;
}

export default class ChatMenu extends Block<ChatMenuProps> {
  static componentName: string = 'ChatMenu';

  constructor(props: ChatMenuProps) {
    super(props);

    this.setProps({
      deleteUserOnClick: () => {
        console.log('delete');
      },
    });
  }
  protected render(): string {
    // language=hbs
    return `
        <div class='chat-menu'>
            {{{Button class='button button_redirect' type='button' title='Add user' onClick=addUserHandler}}}
            {{{Button class='button button_redirect' type='button' title='Delete user' onClick=deleteUserOnClick}}}
        </div>
    `;
  }
}
