import Block from 'core/Block';
import './Link.scss';

type IncomingLinkProps = {
  text: string;
  path: string;
  class: string;
};

type LinkProps = IncomingLinkProps & {
  onClick: (event: MouseEvent) => void;
};

export default class Link extends Block<LinkProps> {
  static componentName: string = 'Link';

  constructor(props: IncomingLinkProps) {
    const onClick = (event: MouseEvent) => {
      console.log('going to...');

      event.preventDefault();
    };

    super({ ...props, onClick });
  }

  render() {
    // language=hbs
    return `<a class="{{class}}" href="{{path}}">{{text}}</a>`;
  }
}
