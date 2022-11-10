import Block from 'core/Block';
import Router from 'core/Router';
import { WithRouter } from 'utils/HOCS/WithRouter';
import './ArrowRoundButton.scss';

interface ArrowRoundButtonProps {
  router: Router;
  events: Record<string, unknown>;
  onClick?: () => void;
  dataTestid?: string;
}

class ArrowRoundButton extends Block<ArrowRoundButtonProps> {
  static componentName = 'ArrowRoundButton';

  constructor({ router, dataTestid = 'arrow-btn', onClick }: ArrowRoundButtonProps) {
    super({ router, dataTestid, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `
    <button data-testid="{{dataTestid}}" class="arrow" type="button" onClick={{onClick}}></button>
    `;
  }
}

export default WithRouter(ArrowRoundButton);
