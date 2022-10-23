import Block from 'core/Block';
import 'components/User/User.scss';
import 'pages/profile/profile.scss';
import 'pages/start/start.scss';
import { ProfileProps } from '../profile/profile';
import UserDataInput from 'components/UserDataInput/UserDataInput';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';
import { WithUser } from 'utils/HOCS/WithUser';
import { WithRouter } from 'utils/HOCS/WithRouter';
import { getUserDataArray } from 'utils/getUserDataArray';
import { changeUserProfile } from 'services/changeUserData';
import { WithStore } from 'utils/HOCS/WithStore';

export type ChangeProfileProps = ProfileProps & {
  userData: Array<any>;
  onSubmit: (event: SubmitEvent) => void;
};

type ChangeUserPasswordRefs = {
  [key: string]: UserDataInput;
};

class ChangeUserData extends Block<ChangeProfileProps, ChangeUserPasswordRefs> {
  static componentName: string = 'ChangeUserData';

  constructor(props: ChangeProfileProps) {
    super(props);

    const data = props.user ? getUserDataArray(props.user) : [];

    this.setProps({
      userData: data,

      onSubmit: async () => {
        const refs = getChildInputRefs(this.refs);
        const errors = getErrorsObject(refs);

        setChildErrorsProps(errors, this.refs);

        if (Object.keys(errors).length === 0) {
          const newData = {
            login: refs.login.value,
            first_name: refs.firstName.value,
            second_name: refs.secondName.value,
            display_name: refs.displayName.value,
            phone: refs.phone.value,
            email: refs.email.value,
          };

          this.props.store.dispatch(changeUserProfile, newData);
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
                    {{{ArrowRoundButton}}}
                </div>
                
                <section class='profile__container'>
                    <form class='user' action="./profile.html">
                        {{{Avatar name="Vadim" imageSrc="./images/avatar_template.jpg" isEditable=false}}}

                        <div class='user__data'>
                            {{#each userData}}
                                {{#with this}}
                                    {{{UserDataInput ref=title childRef=title title=title data=data type=type inputName=title}}}
                                {{/with}}
                            {{/each}}
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

export default WithStore(WithRouter(WithUser(ChangeUserData)));
