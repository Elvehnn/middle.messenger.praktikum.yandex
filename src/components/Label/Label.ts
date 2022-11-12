import Block from 'core/Block';
import './Label.scss';

interface LabelProps {
  class?: string;
  label?: string;
  for?: string;
}

export default class Label extends Block<LabelProps> {
  static componentName = 'Label';

  constructor({ class: string = 'label', ...props }: LabelProps) {
    super({ class: string, ...props });
  }

  protected render(): string {
    // language=hbs
    return `
      <label class='{{class}}' for='{{for}}'>{{label}}</label>
    `;
  }
}
