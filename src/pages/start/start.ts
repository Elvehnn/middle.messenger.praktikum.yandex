import Block from 'core/Block';
import { Store } from 'store/Store';
import { withStore } from 'utils/HOCS/WithStore';
import './start.scss';

export type StartPageProps = {
  store: Store<AppState>;
};

export class StartPage extends Block<StartPageProps> {
  static componentName: string = 'StartPage';

  constructor(props: StartPageProps) {
    super(props);
  }

  render() {
    // language=hbs
    return `
        <main class="main">
          <h1>Chatterbox</h1>

          <nav class="navigation">
            <h2>Navigation</h2>
            <ul class="navigation__list">
              <li>{{{Link path="./signin" text="Sign in" class="button button_navigate"}}}</li>
              <li>{{{Link path="./signup" text="Sign up" class="button button_navigate"}}}</li>
              <li>{{{Link path="./main" text="Main" class="button button_navigate"}}}</li>
              <li>{{{Link path="./profile" text="Profile" class="button button_navigate"}}}</li>
              <li>{{{Link path="./changeUserData" text="Change user data" class="button button_navigate"}}}</li>
              <li>{{{Link path="./changeUserPassword" text="Change password" class="button button_navigate"}}}</li>
              <li>{{{Link path="./changeUserAvatar" text="Change avatar" class="button button_navigate"}}}</li>
            </ul>
          </nav>
        </main>
        `;
  }
}

export default withStore(StartPage);
