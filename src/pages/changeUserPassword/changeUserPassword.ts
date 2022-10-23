import Block from 'core/Block';
import 'components/User/User.scss';
import 'pages/profile/profile.scss';
import 'pages/start/start.scss';
import UserDataInput from 'components/UserDataInput/UserDataInput';
import { ChangeProfileProps } from 'pages/changeUserData/changeUserData';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';
import { WithStore } from 'utils/HOCS/WithStore';
import { WithRouter } from 'utils/HOCS/WithRouter';
import { WithUser } from 'utils/HOCS/WithUser';
import { changeUserPassword } from 'services/changeUserData';

type ChangeUserPasswordRefs = Record<string, UserDataInput>;

export type RefsObject = Record<string, HTMLInputElement>;
class ChangeUserPassword extends Block<ChangeProfileProps, ChangeUserPasswordRefs> {
  static componentName: string = 'ChangeUserPassword';

  constructor(props: ChangeProfileProps) {
    super(props);
    console.log(props);

    this.setProps({
      onSubmit: () => {
        const refs = getChildInputRefs(this.refs);
        const errors = getErrorsObject(refs);

        setChildErrorsProps(errors, this.refs);

        const { oldPassword, newPassword, repeatNewPassword } = refs;

        if (newPassword.value !== repeatNewPassword.value) {
          Object.values(this.refs).forEach((value) => {
            value.getRefs().errorRef.setProps({ error: 'Passwords do not match' });
          });

          return;
        }

        if (Object.keys(errors).length === 0) {
          const newData = { oldPassword: oldPassword.value, newPassword: newPassword.value };
          this.props.store.dispatch(changeUserPassword, newData);
        }
      },
    });
  }

  render() {
    // language=hbs
    return `
        <main class='main'>
            <div class='profile'>
                <div class="profile__aside">
                    {{{ArrowRoundButton }}}
                </div>
                
                <section class='profile__container'>
                    <form class='user' action="./profile.html">
                        {{{Avatar name="Vadim" imageSrc="./images/avatar_template.jpg" isEditable=false}}}

                        <div class='user__data'>
                            {{{UserDataInput ref="oldPassword" childRef="oldPassword" title="Enter old password" type="password" inputName='password'}}}
                            {{{UserDataInput ref="newPassword" childRef="newPassword" title="Enter new password" type="password" inputName='password'}}}
                            {{{UserDataInput ref="repeatNewPassword" childRef="repeatNewPassword" title="Repeat new password" type="password" inputName='password'}}}
                        </div>

                        <div class="login-form__bottom">
                            {{{Button title='Save changes' class='button button_confirm' onClick=onSubmit}}}
                        </div>
                    </form>
                </section>
            </div>
        </main>
        `;
  }
}

export default WithStore(WithRouter(WithUser(ChangeUserPassword)));
