import Block from 'core/Block';
import Router from 'core/Router';
import { WithRouter } from 'utils/HOCS/WithRouter';

export type NotFound404Props = {
  router: Router;
  navigateBack?: () => void;
};

export class NotFound404 extends Block<NotFound404Props> {
  static componentName: string = 'StartPage';

  constructor(props: NotFound404Props) {
    super(props);

    this.setProps({
      navigateBack: () => {
        this.props.router.back();
      },
    });
  }

  render() {
    // language=hbs
    return `
        <main class="main">
          <h1>Chatterbox</h1>

          <h2 class="start">NOT FOUND</h2>
          <h2 class="start">404</h2>

          {{{Button title='Go back' onClick=navigateBack class='button button_redirect}}}
          
        </main>
        `;
  }
}

export default WithRouter(NotFound404);
