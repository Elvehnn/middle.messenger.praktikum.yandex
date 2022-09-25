import Block from '../../core/Block';
import './Input.scss';

interface InputProps {
  type: 'text' | 'password' | 'email';
  name: string;
  id: string;
  placeholder?: string;
  value?: string;
  error?: string;
  onChange?: () => void;
}

export default class Input extends Block {
  constructor({
    onChange = () => {},
    type = 'text',
    name,
    placeholder = '',
    value,
    id,
    error,
  }: InputProps) {
    super({
      type,
      name,
      placeholder,
      value,
      id,
      error,
      events: { input: onChange },
    });
  }

  protected render(): string {
    // language=hbs
    return `
        <div class='input-field'>
            <input
                id='{{id}}'
                type='{{type}}'
                placeholder='{{placeholder}}'
                value='{{value}}'
                required
                name='{{name}}'
            />
            <label for='{{id}}'>{{name}}</label>
        </div>
    `;
  }
}
