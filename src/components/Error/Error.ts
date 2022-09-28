import Block from 'core/Block';
import './Error.scss';

interface ErrorMessageProps {
  error?: string;
}

export default class ErrorMessage extends Block<ErrorMessageProps> {
  protected render(): string {
    // language=hbs
    return `
      <div class='error'>{{#if error}}{{error}}{{/if}}</div>
     `;
  }
}
