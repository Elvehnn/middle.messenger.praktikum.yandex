import Block from 'core/Block';
import Router from 'core/Router';
import { Store } from 'store/Store';
import { WithRouter } from 'utils/HOCS/WithRouter';
import { WithStore } from 'utils/HOCS/WithStore';
import { WithUser } from 'utils/HOCS/WithUser';
import './profile.scss';

export interface ProfileProps {
  user: Nullable<User>;
  store: Store<AppState>;
  router: Router;
  onClick: () => void;
}

class Profile extends Block<ProfileProps> {
  static componentName: string = 'Profile';

  constructor(props: ProfileProps) {
    super(props);
    this.setProps({
      onClick: () => {
        this.props.router.go('/main');
      },
    });
    console.log(props);
  }
  render() {
    // language=hbs
    return `
        <main class="main">
            <div class='profile'>
              <div class="profile__aside">
                {{{ArrowRoundButton class="arrow" onClick=onClick}}}
              </div>
            
              <section class='profile__container'>
                 {{{ User user=user}}}
              </section>
            </div>
        </main>
        `;
  }
}

export default WithRouter(WithStore(WithUser(Profile)));
