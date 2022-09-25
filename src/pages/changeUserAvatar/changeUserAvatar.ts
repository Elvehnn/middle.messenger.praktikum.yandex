import Block from '../../core/Block';
import './changeUserAvatar.scss';

export default class changeUserAvatar extends Block {
  render() {
    // language=hbs
    return `
        <main class='main'>
            <div class='popup-container'>
                <div class='overlay'></div>
                {{{Popup title="Upload photo" helper-type="popup__warning"}}}
            </div>
        </main>
        `;
  }
}
