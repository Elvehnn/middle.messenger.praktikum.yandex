import Block from 'core/Block';
import './UserDataItem.scss';

export interface DataItem {
  title: string;
  data: string;
  type: string;
}

export default class UserDataItem extends Block {
  constructor({ title, data }: DataItem) {
    super({ title, data });
  }
  render() {
    // language=hbs
    return `
        <div class='data-item'>
            <div class='data-item__title'>{{title}}</div>
            <div class='data-item__content'>{{data}}</div>
        </div>
        `;
  }
}
