import Block from 'core/Block';
import './ChangeAvatar.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { navigateTo } from 'utils/navigateTo';
import { WithStore } from 'utils/HOCS/WithStore';
import { Store } from 'store/Store';
import { changeAvatar } from 'services/userData';

type ChangeAvatarProps = {
  store: Store<AppState>;
  onSubmit: (event: SubmitEvent) => void;
  onInput: (event: FocusEvent) => void;
  onFocus: (event: FocusEvent) => void;
  onCancel: () => void;
};

type ChangeAvatarRefs = {
  [key: string]: ControlledInput;
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

class ChangeAvatar extends Block<ChangeAvatarProps, ChangeAvatarRefs> {
  static componentName: string = 'ChangeAvatar';

  constructor(props: ChangeAvatarProps) {
    super(props);

    this.setProps({
      onSubmit: (event) => {
        event.preventDefault();

        const form = document.querySelector('form');
        const formData = new FormData(form as HTMLFormElement);

        for (var [key, value] of formData.entries()) {
          console.log(key, value);
        }

        this.props.store.dispatch(changeAvatar, formData);

        //Здесь будет валидация и сбор данных

        // const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
        //   acc[key] = value.getRefs()[key].getContent() as HTMLInputElement;
        //   return acc;
        // }, {} as refsObject);

        // const { file } = refs;

        // const errors = validateForm([{ type: ValidateType.File, value: file.value }]);

        // if (Object.keys(errors).length !== 0) {
        //   for (let key in errors) {
        //     this.refs[key].getRefs().errorRef.setProps({ error: errors[key] });
        //   }
        // } else {
        //   console.log({
        //     file: file.value,
        //   });

        //   for (let key in errors) {
        //     this.refs[key].getRefs().errorRef.setProps({ error: '' });
        //   }
        // }
      },
      onCancel: () => {
        document.querySelector('#changeAvatar')?.classList.remove('form-container_shown');
      },
    });
  }
  render() {
    // language=hbs
    return `

    <div class='form-container' id='changeAvatar'>
        <div class='overlay'></div>

        <form class='avatar-form' id='formElem'>
          <input type="file" name="avatar">
          {{{Button title='Change avatar' class='button button_confirm' onClick=onSubmit type='submit'}}}
        </form>
    </div>
        `;
  }
}

export default WithStore(ChangeAvatar);

// {{{Button class='avatar-form__close' onClick=onCancel title='X'}}}

// {{{Label class='avatar-form__label' for='avatar' label="Select file to upload"}}}
// { { {Input ref = 'avatar' id = 'avatar' inputName = 'avatar' class="avatar-form__upload" type = "file" accept = "image/*" } } }
// <p class='avatar-form__warning'>Need to select any file</p>

//           <div class="avatar-form__footer">
//             {{{Button title='Change avatar' class='button button_confirm' onClick=onSubmit type='submit'}}}
//             {{{Button title='Cancel' class='button button_redirect' onClick=onCancel}}}
//             </div>
