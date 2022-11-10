import Block from 'core/Block';
import './Error.scss';

interface ErrorMessageProps {
  error?: string;
}

export default class ErrorMessage extends Block<ErrorMessageProps> {
  static componentName = 'ErrorMessage';

  protected render(): string {
    // language=hbs
    return `
      <div class='error'>{{error}}</div>
     `;
  }
}
