import Block from 'core/Block';
import './Link.scss';

type LinkProps = {
  text: string;
  path: string;
  class: string;
  onClick?: (event: MouseEvent) => void;
};

export default class Link extends Block<Record<string, any>> {
  static componentName: string = 'Link';

  constructor(props: LinkProps) {
    super({ ...props, events: { click: props.onClick } });
  }

  render() {
    // language=hbs
    return `<a class="{{class}}" href="{{path}}">{{text}}</a>`;
  }
}
