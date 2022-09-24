import Block from '../../core/Block';
import { ProfileProps, UserProps } from '../../pages/profile/profile';
import './User.scss';

export default class User extends Block {
	constructor({ userData }: ProfileProps) {
		super(userData);
		console.log(userData);
	}
	render() {
		// language=hbs
		return `
        <div class='user'>
				<div class='user__avatar'>
					<a class='user__change' href='./changeUserAvatar.hbs'>Поменять аватар</a>
					<img
						src='../assets/avatar_template.png'
						alt='avatar'
						class='user__image'
					/>
					<h3>Name</h3>
				</div>

                <div class='user__data'>
					{{#each userData}}
                        {{#with this}}
                            {{{DataItem}}}
                        {{/with}}
            		{{/each}}
				</div>

				<div class='user__actions'>
					<div class='action-item'>
						<a class='action-item__title' href='./changeUserData.hbs'>Change user data</a>
					</div>
					<div class='action-item'>
						<a class='action-item__title' href='./changeUserPassword.hbs'>Change password</a>
					</div>
					<div class='action-item'>
						<a
							class='action-item__title action-item__title_warning'
							href='/'
						>Log out</a>
					</div>
				</div>

				
			</div>

        `;
	}
}
