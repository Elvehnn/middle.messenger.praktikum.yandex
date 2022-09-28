import Block from 'core/Block';
import './start.scss';

export default class StartPage extends Block {
  constructor() {
    super();

    this.setProps({
      onSubmit: () => {
        const inputLogin = this.refs.inputLogin;
        console.log(inputLogin);
      },
      onInput: () => console.log('Input!'),
      onFocus: () => console.log('Focus!'),
      // onBlur: () => console.log('Blur!'),
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
                    {{{ControlledInput
                        onInput=onInput 
                        onFocus=onFocus 
                        type="text"
                        inputName="Login"
                        ref="inputLogin"
                    }}}

                    {{{ControlledInput
                        onInput=onInput 
                        onFocus=onFocus 
                        onBlur=onBlur
                        type="password"
                        inputName="Password"
                    }}}
                    
                </div>

                <div class="login-form__bottom">
                    {{{Button title="Log in" onClick=onSubmit}}}
                    {{{Link class="link" text="Create account" path="/signup"}}}
                </div>
            </form>
        </main>
        `;
  }
}

// {{{Input
//   id="password"
//   type="password"
//   name="Password"
// }}}
