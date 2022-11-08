import Block from 'core/Block';
import Router from 'core/Router';
import { WithRouter } from 'utils/HOCS/WithRouter';
import { WithUser } from 'utils/HOCS/WithUser';
import './profile.scss';

export interface ProfileProps {
  user: Nullable<UserType>;
  router: Router;
  navigateBack?: () => void;
}

class Profile extends Block<ProfileProps> {
  static componentName: string = 'Profile';

  constructor(props: ProfileProps) {
    super(props);

    this.setProps({ navigateBack: () => window.router.go('/main') });
  }

  render() {
    console.log(`%c Profile page render with id = ${this.id}`, 'background: #1f9af3; color: #fff');
    // language=hbs
    return `
        <main class="main">
            {{{Preloader}}}

            <div class='profile' data-testid='profile'>
              <div class="profile__aside" data-testid='aside'>
                {{{ArrowRoundButton onClick=navigateBack}}}
              </div>
              
              <section class='profile__container' data-testid='profile-container'>
                {{{ChangeAvatar}}}
                {{{User user=user}}}
              </section>
            </div>
        </main>
        `;
  }
}

export default WithRouter(WithUser(Profile));
