import Block from '../../core/Block';
import { DataItem } from '../UserDataItem/UserDataItem';
import './UserDataInput.scss';

export default class UserDataInput extends Block {
	constructor({ title, data, type }: DataItem) {
		super({ title, data, type });
	}
	render() {
		// language=hbs
		return `
            <div class='data-item'>
                <div class='data-item__title'>{{title}}</div>
                <input
                    type='{{type}}'
                    placeholder=' '
                    name='{{title}}'
                    value='{{data}}'
                    class='data-item__input'
                />
            </div>
        `;
	}
}
