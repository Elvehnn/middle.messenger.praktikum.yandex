import Block from '../../core/Block';
import './start.scss';

export default class StartPage extends Block {
	constructor() {
		super();

		this.setProps({
			buttonOnClick: () => console.log('Clicked!'),
		});
	}
	render() {
		// language=hbs
		return `
        <main class="main">
            <h1>Chatterbox</h1>
            <form class="login-form" action="./main.html">
                <div class="login-form__group">
                    <h3>Sign in</h3>
                    {{{Input
                        id="login"
                        type="text"
                        name="Login"
                    }}}
                    {{{Input
                        id="password"
                        type="password"
                        name="Password"
                    }}}
                     
                </div>

                <div class="login-form__bottom">
                    {{{Button title="Log in" onClick=buttonOnClick}}}
                    {{{Link text="Create account" path="/signup"}}}
                </div>
            </form>
        </main>
        `;
	}
}
