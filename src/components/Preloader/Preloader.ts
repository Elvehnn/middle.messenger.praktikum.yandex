import Block from 'core/Block';
import './Preloader.scss';

type PreloaderProps = Record<string, unknown>;

export default class Preloader extends Block<PreloaderProps> {
  static componentName = 'Preloader';

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
