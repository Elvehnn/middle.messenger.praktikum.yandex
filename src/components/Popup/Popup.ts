import Block from 'core/Block';
import './Popup.scss';

export default class Popup extends Block {
  render() {
    // language=hbs
    return `
            <form class='popup' action='./profile.html'>
                <a class='popup__close' href='./profile.hbs'>
                    <svg
                        width='15'
                        height='16'
                        viewBox='0 0 20 21'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M19.3588 16.5662L13.1187 10.2029L19.3588 3.83955C20.2137 2.96615 20.2137 1.53695 19.3588 0.663556C18.4927 -0.221185 17.1048 -0.221185 16.2387 0.663556L10.0097 7.02689L3.7696 0.663556C2.90354 -0.209842 1.51561 -0.221185 0.649549 0.663556C-0.205413 1.5483 -0.205413 2.96615 0.649549 3.83955L6.88966 10.2029L0.649549 16.5662C-0.216516 17.4396 -0.216516 18.8688 0.649549 19.7422C1.08258 20.1846 1.64885 20.4001 2.20402 20.4001C2.75919 20.4001 3.33657 20.1846 3.7585 19.7422L10.0097 13.3902L16.2498 19.7536C16.6829 20.1959 17.238 20.4114 17.8043 20.4114C18.3706 20.4114 18.9368 20.1959 19.3588 19.7536C20.2137 18.8688 20.2137 17.4396 19.3588 16.5662Z'
                            fill='#A0A0A0'
                        ></path>
                    </svg>
                </a>
                
                <h3>{{title}}</h3>

                <label for="upload">Select file to upload</label>
                <input type='file' class='popup__upload' name="avatar" id="upload"/>

                <div class="popup__footer">
                    {{{ Button  title='Change avatar' class='button button_confirm'}}}
                    <p class='{{helper-type}}'>Need to select any file</p>
                </div>
            </form>
        `;
  }
}
