import Block from '../../core/Block';
import './profile.scss';

export interface UserProps {
	title: string;
	data: string;
	type: string;
}

export interface ProfileProps {
	userData: UserProps[];
}

export default class Profile extends Block {
	constructor({ userData }: ProfileProps) {
		super();
		this.setProps({
			props: userData,
		});

		// this.setProps({
		// 	buttonOnClick: () => console.log('sign up!'),
		// });
	}
	render() {
		// language=hbs
		return `
        <main class="main">
            <div class='profile'>
             {{{ ProfileBackButton path="./main.hbs"}}}
                <section class='profile__container'>
                    {{{ User userData=this.props }}}
                </section>
            </div>
        </main>
        `;
	}
}
