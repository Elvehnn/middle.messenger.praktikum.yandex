import Block from 'core/Block';
import 'components/User/User.scss';
import 'pages/profile/profile.scss';
import 'pages/start/start.scss';
import UserDataInput from 'components/UserDataInput/UserDataInput';
import { validateForm, ValidateType } from 'utils/validateForm';

type changeUserPasswordProps = {
  onSubmit: (event: SubmitEvent) => void;
};

type changeUserPasswordRefs = {
  [key: string]: UserDataInput;
};

export type refsObject = {
  [key: string]: HTMLInputElement;
};
export default class changeUserPassword extends Block<
  changeUserPasswordProps,
  changeUserPasswordRefs
> {
  constructor() {
    super();

    this.setProps({
      onSubmit: () => {
        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key] = value.getRefs()[key].getContent() as HTMLInputElement;
          return acc;
        }, {} as refsObject);

        const { newPassword, repeatNewPassword } = refs;
        const errors = Object.entries(refs).reduce((acc, [key, input]) => {
          const errorMessage = validateForm([{ type: ValidateType.Password, value: input.value }])[
            ValidateType.Password
          ];

          if (errorMessage) {
            acc[key] = errorMessage;
          }

          return acc;
        }, {} as { [key: string]: string });

        if (Object.entries(errors).length !== 0) {
          Object.entries(errors).forEach(([key, value]) =>
            this.refs[key].getRefs().errorRef.setProps({ error: value })
          );

          return;
        }

        if (newPassword.value !== repeatNewPassword.value) {
          Object.values(this.refs).forEach((value) => {
            value.getRefs().errorRef.setProps({ error: 'Passwords do not match' });
          });

          return;
        }

        console.log('New password', newPassword.value);

        Object.values(this.refs).forEach((value) => {
          value.getRefs().errorRef.setProps({ error: '' });
        });
      },
    });
  }

  render() {
    // language=hbs
    return `
        <main class='main'>
            <div class='profile'>
                <div class="profile__aside">
                    {{{ ArrowRoundButton path="./profile.hbs" class="arrow"}}}
                </div>
                
                <section class='profile__container'>
                    <form class='user' action="./profile.html">
                        <div class='user__avatar'>
                            <img
                                src='../../assets/avatar_template.png'
                                alt='avatar'
                                class='user__image'
                            />
                        </div>

                        <div class='user__data'>
                            {{{UserDataInput title="Enter old password" type="password" data='' inputName='password'}}}
                            {{{UserDataInput ref="newPassword" childRef="newPassword" title="Enter new password" type="password" inputName='password'}}}
                            {{{UserDataInput ref="repeatNewPassword" childRef="repeatNewPassword" title="Repeat new password" type="password" inputName='password'}}}
                        </div>

                        <div class="login-form__bottom">
                            {{{ Button title='Save changes' class='button button_confirm' onClick=onSubmit}}}
                        </div>
                    </form>
                </section>
            </div>
        </main>
        `;
  }
}
