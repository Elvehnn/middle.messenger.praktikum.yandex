import Block from '../../core/Block';
import { ProfileProps } from '../../pages/profile/profile';
import './ProfileBackButton.scss';

interface ProfileBackButtonProps {
	path: string;
}

export default class ProfileBackButton extends Block {
	constructor({ path }: ProfileBackButtonProps) {
		super({ path });
	}

	render() {
		// language=hbs
		return `
        <div class='back'>
            <a href='{{path}}' class='back__link'></a>
        </div>
        `;
	}
}
