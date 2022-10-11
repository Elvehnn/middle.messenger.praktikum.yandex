import Block from 'core/Block';
import './signin.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';

type IncomingSigninProps = {
  inputs: Array<{ text: string; type: string }>;
};

type SigninProps = IncomingSigninProps & {
  onSubmit: (event: SubmitEvent) => void;
  onInput: (event: FocusEvent) => void;
  onFocus: (event: FocusEvent) => void;
};

type SigninRefs = {
  [key: string]: ControlledInput;
};

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

export type refsObject = {
  [key: string]: HTMLInputElement;
};
export default class SigninPage extends Block<SigninProps, SigninRefs> {
  static componentName: string = 'SigninPage';

  constructor() {
    super();

    this.setProps({
      onSubmit: () => {
        const refs = getChildInputRefs(this.refs);
        const errors = getErrorsObject(refs);

        const { login, password } = refs;

        setChildErrorsProps(errors, this.refs);

        if (Object.keys(errors).length === 0) {
          console.log({
            login: login.value,
            password: password.value,
          });
        }
      },
    });
  }
  render() {
    // language=hbs
    return `
        <main class="main">
            <h1>Chatterbox</h1>
          <form class="login-form" action="./main.html">
                <div class="login-form__group">
                    <h2>Sign in</h2>
                    {{{ControlledInput
                        onInput=onInput 
                        onFocus=onFocus 
                        type="text"
                        inputName="Login"
                        ref="login"
                        childInputRef="login"
                        error=error
                        value=''
                        placeholder="login"
                    }}}

                    {{{ControlledInput
                        onInput=onInput 
                        onFocus=onFocus 
                        onBlur=onBlur
                        type="password"
                        inputName="Password"
                        error=error
                        value=''
                        ref="password"
                        childInputRef="password"
                        placeholder="password"
                    }}}
                    
                </div>

                <div class="login-form__bottom">
                    {{{Button title="Log in" onClick=onSubmit}}}
                    {{{Link class="link" text="Create account" path="./signup"}}}
                </div>
            </form>
        </main>
        `;
  }
}
