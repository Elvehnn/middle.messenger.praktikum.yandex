import Block from 'core/Block';
import 'components/User/User.scss';
import 'pages/profile/profile.scss';
import 'pages/start/start.scss';
import { ProfileProps } from '../profile/profile';
import { refsObject } from 'pages/changeUserPassword/changeUserPassword';
import { validateForm, ValidateType } from 'utils/validateForm';
import UserDataInput from 'components/UserDataInput/UserDataInput';

export type ChangeProfileProps = ProfileProps & {
  onSubmit: (event: SubmitEvent) => void;
};

type changeUserPasswordRefs = {
  [key: string]: UserDataInput;
};

export default class ChangeUserData extends Block<ChangeProfileProps, changeUserPasswordRefs> {
  constructor({ userData }: ProfileProps) {
    super({
      userData,
      onSubmit: () => {
        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key] = value.getRefs()[key].getContent() as HTMLInputElement;
          return acc;
        }, {} as refsObject);

        // const { newPassword, repeatNewPassword } = refs;
        const errors = Object.entries(refs).reduce((acc, [key, input]) => {
          const errorMessage = validateForm([
            { type: key.toLowerCase() as ValidateType, value: input.value },
          ])[key.toLowerCase()];

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

        Object.values(this.refs).forEach((value) => {
          value.getRefs().errorRef.setProps({ error: '' });
        });

        const newData = Object.entries(refs).reduce((acc, [key, input]) => {
          acc[key] = input.value;
          return acc;
        }, {} as { [key: string]: string });

        console.log(newData);
      },
    });
  }

  render() {
    // language=hbs
    return `
        <main class='main'>
            <div class='profile'>
                <div class="profile__aside">
                    {{{ArrowRoundButton path="./profile.hbs" class="arrow"}}}
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
