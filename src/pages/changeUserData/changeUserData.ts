import Block from 'core/Block';
import 'components/User/User.scss';
import 'pages/profile/profile.scss';
import 'pages/start/start.scss';
import { ProfileProps } from '../profile/profile';

export type ChangeProfileProps = ProfileProps & {
  saveChanges: () => void;
};

export default class ChangeUserData extends Block<ChangeProfileProps> {
  constructor({ userData }: ProfileProps) {
    super({ userData, saveChanges: () => console.log('save changes') });
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
                        <div class='user__avatar'>
                            <img
                                src='../../assets/avatar_template.png'
                                alt='avatar'
                                class='user__image'
                            />
                        </div>

                        <div class='user__data'>
                            {{#each userData}}
                                {{#with this}}
                                    {{{UserDataInput title="{{title}}" data="{{data}}" type="{{type}}"}}}
                                {{/with}}
                        {{/each}}
                        </div>

                        <div class="login-form__bottom">
                            {{{ Button title='Save changes' class='button button_confirm' onClick=saveChanges}}}
                        </div>
                    </form>
                </section>
            </div>
        </main>
        `;
  }
}
