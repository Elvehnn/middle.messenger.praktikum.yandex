import Block from 'core/Block';
import 'pages/start/start.scss';
import ControlledInput from 'components/ControlledInput/ControlledInput';
import { getChildInputRefs } from 'utils/getChildInputRefs';
import { getErrorsObject } from 'utils/getErrorsObject';
import { setChildErrorsProps } from 'utils/setChildErrorsProps';
import { WithRouter } from 'utils/HOCS/WithRouter';
import Router from 'core/Router';
import { INPUTS } from 'constants/inputs';
import { WithStore } from 'utils/HOCS/WithStore';
import { Store } from 'store/Store';
import { stringToCamelCase } from 'utils/transformers/stringToCamelCase';
import { signup } from 'services/authorization';

type IncomingSignupProps = {
  router: Router;
  store: Store<AppState>;
};

type SignupProps = IncomingSignupProps & {
  onSubmit?: (event: SubmitEvent) => void;
  inputs: Array<Record<string, string>>;
  onInput: (event: FocusEvent) => void;
  onFocus: (event: FocusEvent) => void;
  navigateToSignin?: () => void;
};

type SignupRefs = Record<string, ControlledInput>;

interface SubmitEvent extends Event {
  submitter: HTMLElement;
}

class SignupPage extends Block<SignupProps, SignupRefs> {
  static componentName: string = 'SignupPage';

  constructor(props: SignupProps) {
    super(props);

    this.setProps({
      inputs: INPUTS,
      onSubmit: () => {
        const refs = getChildInputRefs(this.refs);
        const errors = getErrorsObject(refs);

        setChildErrorsProps(errors, this.refs);

        if (Object.keys(errors).length === 0) {
          const newData = Object.entries(refs).reduce((acc, [key, input]) => {
            acc[stringToCamelCase(key)] = input.value;
            return acc;
          }, {} as Record<string, string>);

          const user = {
            login: newData.login,
            first_name: newData.firstName,
            second_name: newData.secondName,
            password: newData.password,
            phone: newData.phone,
            email: newData.email,
          };

          this.props.store.dispatch(signup, user);
        }
      },

      navigateToSignin: () => this.props.router.go('/signin'),
    });
  }
  render() {
    const isLoading = this.props.store.getState().isLoading;
    // language=hbs
    return `
        <main class="main">
          {{#if ${isLoading}}}
            {{{Preloader}}}
          {{/if}}
          
            <h1>Chatterbox</h1>
            <form class="login-form" action="./main.html">
                <div class="login-form__group">
                    <h2>Sign up</h2>
                    {{#each inputs}}
                        {{#with this}}
                          {{{ControlledInput
                            onInput=../onInput
                            onFocus=../onFocus 
                            type=type
                            inputName=text
                            ref=text
                            childInputRef=text
                            error=error
                            value=''
                            placeholder=text
                           }}}
                        {{/with}}
                    {{/each}}
                </div>

                <div class="login-form__bottom">
                    {{{Button title="Sign up" onClick=onSubmit}}}
                    {{{Button class="button button_redirect" title="Sign in" onClick=navigateToSignin}}}
                </div>
            </form>
        </main>
        `;
  }
}

export default WithStore(WithRouter(SignupPage));
