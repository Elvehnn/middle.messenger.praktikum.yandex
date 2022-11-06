import Block from 'core/Block';
import Router from 'core/Router';
import { WithRouter } from 'utils/HOCS/WithRouter';
import './start.scss';

export type StartPageProps = {
  router: Router;
  navigateToSignin?: () => void;
};

export class StartPage extends Block<StartPageProps> {
  static componentName: string = 'StartPage';

  constructor(props: StartPageProps) {
    super(props);

    this.setProps({
      navigateToSignin: () => {
        this.props.router.go('/signin');
      },
    });
  }

  render() {
    // language=hbs
    return `
        <main class="main">
          <h1>Chatterbox</h1>
          <div class="start">
          {{{Button title="Shall we begin?" onClick=navigateToSignin}}}
          </div>
          
        </main>
        `;
  }
}

export default WithRouter(StartPage);
