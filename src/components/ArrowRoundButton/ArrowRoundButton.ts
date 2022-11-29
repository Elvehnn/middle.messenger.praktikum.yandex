import Block from 'core/Block';
import Router from 'core/Router';
import { WithRouter } from 'utils/HOCS/WithRouter';
import './ArrowRoundButton.scss';

interface ArrowRoundButtonProps {
  arrowClass: string;
  type: string;
  router: Router;
  events: Record<string, unknown>;
  onClick?: () => void;
  dataTestid?: string;
}

class ArrowRoundButton extends Block<ArrowRoundButtonProps> {
  static componentName = 'ArrowRoundButton';

  constructor({
    router,
    arrowClass = 'arrow',
    dataTestid = 'arrow-btn',
    type = 'button',
    onClick,
  }: ArrowRoundButtonProps) {
    super({ router, dataTestid, events: { click: onClick }, arrowClass, type });
  }

  render() {
    // language=hbs
    return `
    <button data-testid="{{dataTestid}}" class="{{arrowClass}}" type="{{type}}" onClick={{onClick}}></button>
    `;
  }
}

export default WithRouter(ArrowRoundButton);
