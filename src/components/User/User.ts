import Block from '../../core/Block';
import { ProfileProps } from '../../pages/profile/profile';
import './User.scss';

export default class User extends Block {
	constructor({ userData }: ProfileProps) {
		super({ userData });
	}

	render() {
		// language=hbs
		return `
        <div class='user'>
				<div class='user__avatar'>
					{{{Link class='user__change' path='./changeUserAvatar.hbs' text='Change avatar'}}}
					<img
						src='./avatar_template.png'
						alt='avatar'
						class='user__image'
					/>
					<h3>Name</h3>
				</div>

                <div class='user__data'>
					{{#each userData}}
                        {{#with this}}
                            {{{UserDataItem title="{{title}}" data="{{data}}"}}}
                        {{/with}}
            		{{/each}}
				</div>

				<div class='user__actions'>
					<div class='action-item'>
						{{{Link class='action-item__title' path='./changeUserData' text='Change user data'}}} 
					</div>
					<div class='action-item'>
                        {{{Link class='action-item__title' path='./changeUserPassword' text='Change password'}}} 
					</div>
					<div class='action-item'>
                        {{{Link class='action-item__title action-item__title_warning' path='/' text='Log out'}}} 
					</div>
				</div>

				
			</div>

        `;
	}
}
