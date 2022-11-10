import Block from 'core/Block';
import Router from 'core/Router';
import { WithRouter } from 'utils/HOCS/WithRouter';

export type NotFoundProps = {
  router: Router;
  navigateBack?: () => void;
};

class NotFound extends Block<NotFoundProps> {
  static componentName = 'NotFound404';

  constructor(props: NotFoundProps) {
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

          {{{Button title='Go back' onClick=navigateBack class='button button_redirect'}}}
          
        </main>
        `;
  }
}

export default WithRouter(NotFound);
