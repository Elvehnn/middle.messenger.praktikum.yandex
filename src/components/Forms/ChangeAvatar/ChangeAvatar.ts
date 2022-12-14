import Block from 'core/Block';
import './ChangeAvatar.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { WithStore } from 'utils/HOCS/WithStore';
import { Store } from 'store/Store';
import { changeAvatar } from 'services/userData';

type ChangeAvatarProps = {
  store: Store<AppState>;
  events?: Record<string, unknown>;
  onSubmit: (event: SubmitEvent) => void;
  onInput: (event: FocusEvent) => void;
  onFocus: (event: FocusEvent) => void;
  onCancel: () => void;
};

type ChangeAvatarRefs = {
  [key: string]: ControlledInput;
};

class ChangeAvatar extends Block<ChangeAvatarProps, ChangeAvatarRefs> {
  static componentName = 'ChangeAvatar';

  constructor(props: ChangeAvatarProps) {
    super({ ...props, events: { submit: (event: SubmitEvent) => this.onSubmit(event) } });

    this.setProps({
      onCancel: () => {
        document.querySelector('#changeAvatar')?.classList.remove('form-container_shown');
      },
    });
  }

  async onSubmit(event: SubmitEvent) {
    event.preventDefault();
    document.querySelector('.avatar-form__warning')?.classList.remove('avatar-form__warning_show');

    const form = document.querySelector('form');
    const formData = new FormData(form as HTMLFormElement);

    // TODO: Здесь будет правильная валидация данных

    if ((document.querySelector('#avatar') as HTMLInputElement).value) {
      document
        .querySelector('.avatar-form__warning')
        ?.classList.remove('avatar-form__warning_show');

      changeAvatar(this.props.store, formData);
      document.querySelector('#changeAvatar')?.classList.remove('form-container_shown');

      return;
    }

    document.querySelector('.avatar-form__warning')?.classList.add('avatar-form__warning_show');
  }

  render() {
    // TODO:  Застилить label и убрать стандартный инпут

    // language=hbs
    return `

    <div class='form-container' id='changeAvatar'>
        <div class='overlay'></div>

        <form class='avatar-form' id='formElem'>
          {{{Button class='avatar-form__close' onClick=onCancel title='X' type='button'}}}
          

          {{{Input ref='avatar' id='avatar' inputName='avatar' class="avatar-form__upload" type="file" accept="image/*" }}}
          <p class='avatar-form__warning'>Need to select any file</p>

          <div class="avatar-form__footer">
            {{{Button title='Change avatar' class='button button_confirm' onClick=onSubmit type='submit'}}}
            {{{Button title='Cancel' class='button button_redirect' type='button' onClick=onCancel}}}
          </div>
        </form>
    </div>
        `;
  }
}

export default WithStore(ChangeAvatar);
