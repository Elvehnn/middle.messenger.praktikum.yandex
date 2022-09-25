import Block from '../../core/Block';
import '../start/start.scss';

type SignupPageProps = {
  inputs: Array<{ text: string; type: string }>;
};

export default class SignupPage extends Block {
  constructor({ inputs }: SignupPageProps) {
    super({ inputs });

    this.setProps({
      buttonOnClick: () => console.log('sign up!'),
    });
  }
  render() {
    // language=hbs
    return `
        <main class="main">
            <h1>Chatterbox</h1>
            <form class="login-form" action="./main.html">
                <div class="login-form__group">
                    <h3>Sign up</h3>
                    {{#each inputs}}
                        {{#with this}}
                            {{{Input text="{{text}}" type="{{type}}" id=text name=text}}}
                        {{/with}}
                    {{/each}}
                </div>

                <div class="login-form__bottom">
                    {{{Button title="Sign up" onClick=buttonOnClick}}}
                    {{{Link class="link" text="Sign in" path="/"}}}
                </div>
            </form>
        </main>
        `;
  }
}
