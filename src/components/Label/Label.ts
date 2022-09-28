import Block from 'core/Block';
import './Label.scss';

interface LabelProps {
  label: string;
}

export default class Label extends Block<LabelProps> {
  protected render(): string {
    // language=hbs
    return `
      <label class='label'>{{label}}</label>
    `;
  }
}
