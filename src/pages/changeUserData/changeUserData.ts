import Block from 'core/Block';
import 'components/User/User.scss';
import 'pages/profile/profile.scss';
import 'pages/start/start.scss';
import { ProfileProps } from '../profile/profile';
import UserDataInput from 'components/UserDataInput/UserDataInput';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';
import { WithStore } from 'utils/HOCS/WithStore';
import { WithRouter } from 'utils/HOCS/WithRouter';
import { WithUser } from 'utils/HOCS/WithUser';
import { getUserDataArray } from 'utils/getUserDataArray';
import { changeUserProfile } from 'services/userData';

import { transformRefsToUser } from 'utils/transformers/transformRefsToUser';
import { SignupData, UserKeys } from 'API/typesAPI';

export type ChangeProfileProps = ProfileProps & {
  userData: Array<any>;
  userLogin: string;
  avatarSrc: string;
  onSubmit: (event: SubmitEvent) => void;
  navigateBack: () => void;
};

type ChangeUserPasswordRefs = Record<string, UserDataInput>;

class ChangeUserData extends Block<ChangeProfileProps, ChangeUserPasswordRefs> {
  static componentName: string = 'ChangeUserData';

  constructor(props: ChangeProfileProps) {
    super(props);

    const { user } = this.props.store.getState();
    const { login, avatar } = user || {};

    const data = user ? getUserDataArray(user) : [];

    this.setProps({
      userData: data,
      userLogin: login,
      avatarSrc: avatar,

      onSubmit: async (event: SubmitEvent) => {
        event.preventDefault();
        const refs = getChildInputRefs(this.refs);
        const errors = getErrorsObject(refs);

        setChildErrorsProps(errors, this.refs);

        if (Object.keys(errors).length === 0) {
          const userDataValues = Object.entries(refs).reduce((acc, [key, input]) => {
            acc[key as UserKeys] = input.value;
            return acc;
          }, {} as Partial<SignupData>);

          const newData = transformRefsToUser(userDataValues);

          changeUserProfile(this.props.store, newData);
        }
      },
      navigateBack: () => this.props.router.go('/profile'),
    });
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
                    <form class='user' action="#">
                    {{{Avatar name=userLogin imageSrc=avatarSrc isEditable=false}}}

                        <div class='user__data'>
                            {{#each userData}}
                                {{#with this}}
                                    {{{UserDataInput ref=title childRef=title title=title data=data type=type inputName=title}}}
                                {{/with}}
                            {{/each}}
                        </div>

                        <div class="login-form__bottom">
                            {{{Button title='Save changes' class='button button_confirm' onClick=onSubmit type='submit'}}}
                            {{{Button title='Cancel' class='button button_redirect' onClick=navigateBack type='button'}}}
                        </div>
                    </form>
                </section>
            </div>
        </main>
        `;
  }
}

export default WithStore(WithRouter(WithUser(ChangeUserData)));
