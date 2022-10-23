import Block from 'core/Block';
import Router from 'core/Router';
import { WithRouter } from 'utils/HOCS/WithRouter';
import './ArrowRoundButton.scss';

interface IncomingArrowRoundButtonProps {
  router: Router;
  navigateBack: () => void;
}

type ArrowRoundButtonProps = IncomingArrowRoundButtonProps & {
  events: {
    click?: () => void;
  };
};

class ArrowRoundButton extends Block<ArrowRoundButtonProps> {
  static componentName: string = 'ArrowRoundButton';

  constructor(props: IncomingArrowRoundButtonProps) {
    super({
      ...props,
      events: {
        click: () => {
          this.props.router.back();
        },
      },
    });
  }

  render() {
    // language=hbs
    return `
        <button class='arrow'></button>
    `;
  }
}

export default WithRouter(ArrowRoundButton);
