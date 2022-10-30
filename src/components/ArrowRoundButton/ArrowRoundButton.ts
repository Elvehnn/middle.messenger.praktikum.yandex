import Block from 'core/Block';
import Router from 'core/Router';
import { WithRouter } from 'utils/HOCS/WithRouter';
import './ArrowRoundButton.scss';

interface ArrowRoundButtonProps {
  router: Router;
  onClick: () => void;
  blockClass: string;
}

class ArrowRoundButton extends Block<ArrowRoundButtonProps> {
  static componentName: string = 'ArrowRoundButton';

  constructor({ blockClass = 'arrow', router, onClick }: ArrowRoundButtonProps) {
    super({
      blockClass,
      router,
      onClick,
    });
  }

  render() {
    // language=hbs
    return `
        {{{Button class=blockClass onClick=onClick}}}
    `;
  }
}

export default WithRouter(ArrowRoundButton);
