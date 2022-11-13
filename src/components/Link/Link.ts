import Block from 'core/Block';
import './Link.scss';

type LinkProps = {
  text?: string;
  path?: string;
  class?: string;
  onClick?: (event: MouseEvent) => void;
  events?: Record<string, unknown>;
};

export default class Link extends Block<LinkProps> {
  static componentName = 'Link';

  constructor(props: LinkProps) {
    super({ ...props, events: { click: props.onClick } });
  }

  render() {
    // language=hbs
    return `<a class="{{class}}" href="{{path}}">{{text}}</a>`;
  }
}
