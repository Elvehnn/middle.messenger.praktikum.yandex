import Block from 'core/Block';
import './signin.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';
import { WithRouter } from 'utils/HOCS/WithRouter';
import Router from 'core/Router';
import { WithStore } from 'utils/HOCS/WithStore';
import { Store } from 'store/Store';
import { signin } from 'services/authorization';

type SigninProps = {
  router: Router;
  store: Store<AppState>;
  events?: Record<string, unknown>;
  navigateToSignup?: () => void;
};

type SigninRefs = Record<string, ControlledInput>;

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

class SigninPage extends Block<SigninProps, SigninRefs> {
  static componentName = 'SigninPage';

  constructor(props: SigninProps) {
    super({
      ...props,
      events: {
        submit: (event: SubmitEvent) => this.onSubmit(event),
      },
    });

    this.setProps({
      navigateToSignup: () => {
        this.props.store.setState({ errorMessage: '' });
        this.props.router.go('/signup');
      },
    });
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.props.store.setState({ errorMessage: '' });

    const refs = getChildInputRefs(this.refs);
    const errors = getErrorsObject(refs);
    const { login, password } = refs;

    setChildErrorsProps(errors, this.refs);

    if (Object.keys(errors).length === 0) {
      signin(this.props.store, { login: login.value, password: password.value });
    }
  }

  render() {
    const { errorMessage } = this.props.store.getState();
    // language=hbs
    return `
        <main class="main">
          {{{Preloader}}}

          <h1>Chatterbox</h1>

          <form class="login-form" data-testid='signin' onSubmit={{onSubmit}}>
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
                    <p class='form-submit-warning' data-testid='form-submit-warning'>${errorMessage}</p>

                    {{{Button title="Log in" type="submit" dataTestid="login-btn"}}}
                    {{{Button class="button button_redirect" title="Create account" onClick=navigateToSignup type="button" dataTestid="goto-signup-btn"}}}
                </div>
            </form>
        </main>
        `;
  }
}

export default WithRouter(WithStore(SigninPage));
