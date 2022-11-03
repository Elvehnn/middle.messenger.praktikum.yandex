import Block from 'core/Block';
import Router from 'core/Router';
import { Store } from 'store/Store';
import { WithRouter } from 'utils/HOCS/WithRouter';
import { WithStore } from 'utils/HOCS/WithStore';
import { WithUser } from 'utils/HOCS/WithUser';
import './profile.scss';

export interface ProfileProps {
  user: Nullable<UserType>;
  store: Store<AppState>;
  router: Router;
  navigateBack: () => void;
}

class Profile extends Block<ProfileProps> {
  static componentName: string = 'Profile';

  constructor(props: ProfileProps) {
    super(props);
    this.setProps({ navigateBack: () => this.props.router.go('/main') });
  }
  render() {
    const isLoading = this.props.store.getState().isLoading;
    // language=hbs
    return `
        <main class="main">
            {{#if ${isLoading}}}
              {{{Preloader}}}
            {{/if}}

            <div class='profile'>
              <div class="profile__aside">
                {{{ArrowRoundButton onClick=navigateBack}}}
            </div>
            
            <section class='profile__container'>
              {{{ChangeAvatar}}}
              {{{User user=user}}}
            </section>
            </div>
        </main>
        `;
  }
}

export default WithRouter(WithStore(WithUser(Profile)));
