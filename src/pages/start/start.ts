import Block from 'core/Block';
import { validateForm, ValidateType } from 'utils/validateForm';
import './start.scss';

export default class StartPage extends Block {
  constructor() {
    super();

    this.setProps({
      onSubmit: () => {
        const refs = Object.entries(this.refs).reduce((acc, [key, value]) => {
          acc[key] = value.refs[key].getContent() as HTMLInputElement;
          return acc;
        }, {} as { [key: string]: HTMLInputElement });

        const { login, password } = refs;

        const errors = validateForm([
          { type: ValidateType.Login, value: login.value },
          { type: ValidateType.Password, value: password.value },
        ]);

        if (Object.keys(errors).length !== 0) {
          for (let key in errors) {
            this.refs[key].refs.errorRef.setProps({ error: errors[key] });
          }
        } else {
          console.log({
            login: login.value,
            password: password.value,
          });

          for (let key in errors) {
            this.refs[key].refs.errorRef.setProps({ error: '' });
          }
        }
      },
      onInput: (event: FocusEvent) => {
        const target = event.target as HTMLInputElement;

        const errors = validateForm([{ type: target.name as ValidateType, value: target.value }]);

        this.refs[target.name].refs.errorRef.setProps({ error: errors[target.name] });
      },
      onFocus: () => console.log('Focus!'),
    });
  }
  render() {
    console.log();
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
                        inputName="login"
                        ref="login"
                        childInputRef="login"
                        error=error
                        value=''
                    }}}

                    {{{ControlledInput
                        onInput=onInput 
                        onFocus=onFocus 
                        onBlur=onBlur
                        type="password"
                        inputName="password"
                        error=error
                        value=''
                        ref="password"
                        childInputRef="password"
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
