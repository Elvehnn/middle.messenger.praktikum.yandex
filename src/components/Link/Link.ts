import Block from 'core/Block';
import './Link.scss';

interface LinkProps {
  text: string;
  path: string;
}

export default class Link extends Block {
  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      console.log(13);

      e.preventDefault();
    };

    super({ ...props, events: { click: onClick } });
  }

  render() {
    // language=hbs
    return `<a class="{{class}}" href="{{path}}">{{text}}</a>`;
  }
}
