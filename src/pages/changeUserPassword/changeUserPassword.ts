import Block from 'core/Block';
import 'components/User/User.scss';
import 'pages/profile/profile.scss';
import 'pages/start/start.scss';
import UserDataInput from 'components/UserDataInput/UserDataInput';
import { ChangeProfileProps } from 'pages/changeUserData/changeUserData';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';
import { WithRouter } from 'utils/HOCS/WithRouter';
import { changeUserPassword } from 'services/userData';
import { WithStore } from 'utils/HOCS/WithStore';

type ChangeUserPasswordRefs = Record<string, UserDataInput>;

class ChangeUserPassword extends Block<ChangeProfileProps, ChangeUserPasswordRefs> {
  static componentName = 'ChangeUserPassword';

  constructor(props: ChangeProfileProps) {
    super({ ...props, events: { submit: (event: SubmitEvent) => this.onSubmit(event) } });

    const { user } = this.props.store.getState();
    const { login, avatar } = user || {};

    this.setProps({
      userLogin: login,
      avatarSrc: avatar,
      navigateBack: () => this.props.router.go('/profile'),
    });
  }

  componentDidUpdate() {
    if (this.props.store.getState().currentRoutePathname !== '/changeUserPassword') {
      return false;
    }

    this.children = {};

    return true;
  }

  async onSubmit(event: SubmitEvent) {
    event.preventDefault();

    const refs = getChildInputRefs(this.refs);
    const errors = getErrorsObject(refs);

    if (Object.keys(errors).length) {
      setChildErrorsProps(errors, this.refs);

      return;
    }

    const { oldPassword, newPassword, repeatNewPassword } = refs;

    if (newPassword.value !== repeatNewPassword.value) {
      Object.values(this.refs).forEach((value) => {
        value.getRefs().errorRef.setProps({ error: 'Passwords do not match' });
      });

      return;
    }

    if (Object.keys(errors).length === 0) {
      const newData = { oldPassword: oldPassword.value, newPassword: newPassword.value };
      await changeUserPassword(newData);
    }
  }

  render() {
    // language=hbs
    return `
        <main class='main'>
          {{{Preloader}}}

            <div class='profile'>
                <div class="profile__aside">
                    {{{ArrowRoundButton onClick=navigateBack}}}
                </div>
                
                <section class='profile__container'>
                    <form class='user'>
                        {{{Avatar imageSrc=avatarSrc isEditable=false}}}

                        <div class='user__data'>
                            {{{UserDataInput ref="oldPassword" childRef="oldPassword" title="Enter old password" type="password" inputName='password'}}}
                            {{{UserDataInput ref="newPassword" childRef="newPassword" title="Enter new password" type="password" inputName='password'}}}
                            {{{UserDataInput ref="repeatNewPassword" childRef="repeatNewPassword" title="Repeat new password" type="password" inputName='password'}}}
                        </div>

                        <div class="login-form__bottom">
                            {{{Button title='Save changes' class='button button_confirm' type='submit'}}}
                            {{{Button title='Cancel' class='button button_redirect' onClick=navigateBack type='button'}}}
                        </div>
                    </form>
                </section>
            </div>
        </main>
        `;
  }
}

export default WithRouter(WithStore(ChangeUserPassword));
