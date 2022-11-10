import Block from 'core/Block';
import './Preloader.scss';

type PreloaderProps = {};

export default class Preloader extends Block<PreloaderProps> {
  static componentName: string = 'Preloader';

  constructor(props: PreloaderProps) {
    super(props);
  }
  render() {
    // language=hbs
    return `
        <div class="preloader" data-testid="preloader">
            <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
        `;
  }
}
