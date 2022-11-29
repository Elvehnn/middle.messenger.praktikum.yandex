import Block from 'core/Block';
import './MessageInput.scss';

interface MessageInputProps {
  class: string;
}

export default class MessageInput extends Block<MessageInputProps> {
  static componentName = 'MessageInput';

  constructor({ class: string }: MessageInputProps) {
    super({ class: string });
  }

  render() {
    // language=hbs
    return `
    <textarea class='{{class}}' name='message' placeholder='Write a message'></textarea>
    `;
  }
}
